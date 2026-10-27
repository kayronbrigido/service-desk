// src/identity-server/keycloak.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import KeycloakConnect from 'keycloak-connect';
import { KEYCLOAK_CONFIG } from 'src/common/enviroment';
import { verify, JwtHeader, JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { SessionType } from 'src/common/types';
import { v4 } from 'uuid';
import { AuthLoginResponse } from './dto/identity-server.dto';

type KeycloakPayloadDecode = {};
@Injectable()
export class KeycloakService {
  private keycloak: KeycloakConnect.Keycloak;

  constructor() {
    const keycloakConfig = {
      'auth-server-url': KEYCLOAK_CONFIG.KEYCLOAK_SERVER_URL + '/auth',
      realm: KEYCLOAK_CONFIG.KEYCLOAK_REALM,
      resource: KEYCLOAK_CONFIG.KEYCLOAK_CLIENT_ID,
      'ssl-required': 'external',
      credentials: {
        secret: KEYCLOAK_CONFIG.KEYCLOAK_CLIENT_SECRET,
      },
      'confidential-port': 0,
      'bearer-only': true,
    };

    this.keycloak = new KeycloakConnect({}, keycloakConfig);
  }

  private client = jwksClient({
    jwksUri: `${KEYCLOAK_CONFIG.KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_CONFIG.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
  });

  private async getKey(header: JwtHeader): Promise<string> {
    if (!header.kid) throw new UnauthorizedException('No kid in token header');
    const key = await this.client.getSigningKey(header.kid);
    return key.getPublicKey();
  }

  async validateRequest(req: Request): Promise<any> {
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const payload: string | JwtPayload | undefined = await new Promise(
        (resolve, reject) => {
          verify(
            token,
            (header, callback) => {
              this.getKey(header)
                .then((key) => callback(null, key))
                .catch((err) => callback(err, undefined));
            },
            { algorithms: ['RS256'] },
            (err, decoded) => {
              if (err) return reject(err);
              resolve(decoded);
            },
          );
        },
      );

      req.session = { ...(payload as SessionType),...req.session, };
      req.session.requestId = req.headers['X-Request-Id'] as string;
      req.session.userId = payload?.sub as string;

      return payload;
    } catch (err) {
      console.error('JWT validation error:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(req: Request): string | null {
    const auth = req.headers['authorization'];

    if (auth) {
      const [type, token] = auth.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }

    if (req.cookies?.access_token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return req.cookies.access_token;
    }

    return null;
  }

  async authenticateUser(username: string, password: string) {
    const { data } = await axios.post<AuthLoginResponse>(
      `${KEYCLOAK_CONFIG.KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_CONFIG.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_CLIENT_ID,
        client_secret: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_CLIENT_SECRET,
        grant_type: 'password',
        username,
        password,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    return data;
  }

  /**
   * Reautentica no Keycloak usando o refresh token.
   * Retorna novos access_token e refresh_token se o refresh token ainda for válido.
   */
  async refreshToken(refreshToken: string): Promise<AuthLoginResponse> {
    const { data } = await axios.post<AuthLoginResponse>(
      `${KEYCLOAK_CONFIG.KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_CONFIG.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_CLIENT_ID,
        client_secret: KEYCLOAK_CONFIG.KEYCLOAK_ADMIN_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    return data;
  }
}
