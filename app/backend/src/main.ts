import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './database/data-source';
import { KeycloakService } from './identity-server/keycloak.service';
import { KeycloakAuthGuard } from './identity-server/keycloak.guard';
import { AppValidationPipe } from './common/exceptions/app.excepetions.validate.pipe';
import { AppExceptionFilter } from './common/exceptions/app.execeptions.filter';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();

  await AppDataSource.runMigrations();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const keycloakService = app.get(KeycloakService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new KeycloakAuthGuard(keycloakService, reflector));
  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new AppExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3020'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();

  Logger.log(`🚀 Application running on ${url}`, 'Bootstrap');
}
bootstrap();
