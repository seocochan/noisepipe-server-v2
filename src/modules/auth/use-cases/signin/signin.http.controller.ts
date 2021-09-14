import { routes } from '@config/app.routes';
import { User } from '@core/decorators/user.decorator';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { SigninRequest } from '@modules/auth/use-cases/signin/signin.request.dto';
import { SigninResponse } from '@modules/auth/use-cases/signin/signin.response.dto';
import { SigninService } from '@modules/auth/use-cases/signin/signin.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';

@Controller()
export class SigninHttpController {
  constructor(private readonly signinService: SigninService) {}

  @UseGuards(LocalAuthGuard)
  @Post(routes.auth.signin)
  signin(
    @Body() body: SigninRequest,
    @User() user: UserPrincipal,
  ): SigninResponse {
    return new SigninResponse(this.signinService.login(user));
  }
}
