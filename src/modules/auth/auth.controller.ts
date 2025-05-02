import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('auth/')
  getAuthPage() {
    return {};
  }

  @Post()
  async getAuthPendingPage(
    @Query('tokenID') tokenID: string,
    @Query('from') from: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.authenticate(tokenID);
    res.cookie('access_token', result?.accessToken);
    res.redirect(from);
    return {};
  }

  @Get('approved')
  @Render('auth/approved')
  getAuthApprovedPage() {
    return {};
  }
}
