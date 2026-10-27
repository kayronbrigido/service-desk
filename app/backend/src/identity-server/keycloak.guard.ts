import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator';
import { AppException } from 'src/common/exceptions/app.exceptions';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { SessionType } from 'src/common/types';
import { NODE_ENV } from 'src/common/enviroment';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const requestId = req.headers['x-request-id'] as string;
    if (!requestId && NODE_ENV != "development") {
      throw new AppException(ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    req.session = { ...(req.session as SessionType), requestId };

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    try {
      const user = await this.keycloakService.validateRequest(req);
      req.user = user;

      return true;
    } catch (err) {
      throw new AppException(ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
  }
}
