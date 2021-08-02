import { OnModuleInit } from '@nestjs/common';
import { DomainEvent } from './domain-event.base';
import { DomainEvents } from './domain-events';

export abstract class DomainEventHandler<TEvent extends DomainEvent>
  implements OnModuleInit
{
  onModuleInit(): void {
    DomainEvents.subscribe(this.listenTo, this.handle.bind(this));
  }

  abstract listenTo: new (...args: never[]) => TEvent;

  abstract handle(event: TEvent): Promise<void>;
}
