import { routes } from '@config/app.routes';
import { SignupCommand } from '@modules/auth/use-cases/signup/signup.command';
import { SignupRequest } from '@modules/auth/use-cases/signup/signup.request.dto';
import { SignupService } from '@modules/auth/use-cases/signup/signup.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '../../../../interface-adapters/dtos/id.response.dto';

@Controller()
export class SignupHttpController {
  constructor(private readonly signupService: SignupService) {}

  @Post(routes.auth.signup)
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async signup(@Body() body: SignupRequest): Promise<IdResponse> {
    const command = new SignupCommand({
      username: body.username,
      password: body.password,
    });
    return this.signupService.signup(command);
  }
}
