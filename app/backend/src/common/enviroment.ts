import 'dotenv/config';

export const DATABASE = {
  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT as string) || 5432,
  DATABASE_USER: process.env.DATABASE_USER as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
};

export const KEYCLOAK_CONFIG = {
  KEYCLOAK_SERVER_URL: process.env.KEYCLOAK_SERVER_URL as string,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM as string,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID as string,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET as string,
  KEYCLOAK_PUBLIC_KEY: process.env.KEYCLOAK_PUBLIC_KEY as string,

  KEYCLOAK_ADMIN_USERNAME: process.env.KEYCLOAK_ADMIN_USERNAME as string,
  KEYCLOAK_ADMIN_PASSWORD: process.env.KEYCLOAK_ADMIN_PASSWORD as string,
  KEYCLOAK_ADMIN_CLIENT_ID: process.env.KEYCLOAK_ADMIN_CLIENT_ID as string,
  KEYCLOAK_ADMIN_CLIENT_SECRET: process.env
    .KEYCLOAK_ADMIN_CLIENT_SECRET as string,
};

export const NODE_ENV = process.env.NODE_ENV as string;

export const BUCKET_CONFIG = {
  BUCKET_SERVER_URL: process.env.BUCKET_SERVER_URL as string,
  BUCKET_PRESIGN_SECRET: process.env.BUCKET_PRESIGN_SECRET as string,
  BUCKET_PRESIGN_TTL_SECONDS: process.env.BUCKET_PRESIGN_TTL_SECONDS as string
}
