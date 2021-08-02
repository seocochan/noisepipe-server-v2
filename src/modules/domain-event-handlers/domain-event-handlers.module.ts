import { EventHandlers } from '@modules/domain-event-handlers/handlers';
import { EmailModule } from '@modules/email/email.module';
import { Module } from '@nestjs/common';

/**
 * 핸들러의 의존성을 해소하기 위한 외부 모듈을 모두 import한다.
 * 필요한 서비스는 해당 모듈에서 export되어 있어야한다.
 * 서비스 단위로 직접 provide하는 대신 모듈 단위로만 import하여 의존성을 단순하게 유지한다.
 */
@Module({
  imports: [EmailModule],
  providers: [...EventHandlers],
})
export class DomainEventHandlersModule {}
