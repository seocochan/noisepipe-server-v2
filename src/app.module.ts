import { setOrmInstance } from '@core/decorators/transactional.decorator';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@modules/auth/auth.module';
import { DomainEventHandlersModule } from '@modules/domain-event-handlers/domain-event-handlers.module';
import { EmailModule } from '@modules/email/email.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [],
    }),
    MikroOrmModule.forRoot(),
    DomainEventHandlersModule,
    EmailModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {
  constructor(private readonly mikroORM: MikroORM) {
    setOrmInstance(mikroORM);
  }
}
