import { routes } from '@config/app.routes';
import { AuthService } from '@modules/auth/auth.service';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { SigninResponse } from '@modules/auth/use-cases/signin/signin.response.dto';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class SigninHttpController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(routes.auth.signin)
  signin(@Req() req: Request): SigninResponse {
    return new SigninResponse(this.authService.login(req.user));
  }
}
