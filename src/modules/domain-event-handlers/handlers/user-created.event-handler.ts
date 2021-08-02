import { EmailService } from '@modules/email/email.service';
import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event';
import { Injectable } from '@nestjs/common';
import { DomainEventHandler } from 'src/core/domain-events';

@Injectable()
export class OnUserCreatedDomainEvent extends DomainEventHandler<UserCreatedDomainEvent> {
  constructor(private readonly email: EmailService) {
    super();
  }

  listenTo = UserCreatedDomainEvent;

  async handle(event: UserCreatedDomainEvent): Promise<void> {
    await this.email.send(event.email, 'Welcome message goes here');
    /* Other side-effects can go here, or different event handlers can
    be created if needed */
  }
}
