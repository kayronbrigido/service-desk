import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  login(@Body() loginData: LoginDto, @Req() req: Request) {
    loginData.deviceId = req.headers['device-id'] as unknown as string;
    return this.authService.login(loginData);
  }

  @Post('/refresh')
  @Public()
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Post()
  @Public()
  create(@Body() createAuthDto: CreateAuthDto, @Req() req: Request) {
    return this.authService.create(createAuthDto);
  }
}
