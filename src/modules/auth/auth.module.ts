import { AuthService } from '@modules/auth/auth.service';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { SigninHttpController } from '@modules/auth/use-cases/signin/signin.http.controller';
import { SigninService } from '@modules/auth/use-cases/signin/signin.service';
import { SignupHttpController } from '@modules/auth/use-cases/signup/signup.http.controller';
import { SignupService } from '@modules/auth/use-cases/signup/signup.service';
import { UpdatePasswordHttpController } from '@modules/auth/use-cases/update-password/update-password.http.controller';
import { UpdatePasswordService } from '@modules/auth/use-cases/update-password/update-password.service';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [
    SignupHttpController,
    SigninHttpController,
    UpdatePasswordHttpController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SignupService,
    SigninService,
    UpdatePasswordService,
  ],
})
export class AuthModule {}
