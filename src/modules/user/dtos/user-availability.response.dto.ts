import { UserAvailability } from '../../../interface-adapters/interfaces/user/user-availability.interface';

export class UserAvailabilityResponse implements UserAvailability {
  constructor(available: boolean) {
    this.available = available;
  }

  available: boolean;
}
