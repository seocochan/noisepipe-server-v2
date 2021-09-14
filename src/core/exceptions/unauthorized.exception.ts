import { ExceptionBase } from '@core/exceptions/exception.base';
import { Exceptions } from '@core/exceptions/exception.types';

export class UnauthorizedException extends ExceptionBase {
  readonly name = Exceptions.unauthorized;
}
