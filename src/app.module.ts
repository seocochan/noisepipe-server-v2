import { setOrmInstance } from '@core/decorators/transactional.decorator';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@modules/auth/auth.module';
import { CollectionModule } from '@modules/collection/collection.module';
import { DomainEventHandlersModule } from '@modules/domain-event-handlers/domain-event-handlers.module';
import { EmailModule } from '@modules/email/email.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    CollectionModule,
  ],
})
export class AppModule {
  constructor(private readonly mikroORM: MikroORM) {
    setOrmInstance(mikroORM);
  }
}
