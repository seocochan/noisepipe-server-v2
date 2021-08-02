import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async send(email: Email, message: string): Promise<void> {
    console.log(
      `[Send Email] email sent to ${email.value} (message: ${message})`,
    );
    // Sending email implementation goes here
  }
}
