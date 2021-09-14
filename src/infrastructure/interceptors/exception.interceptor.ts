import {
  ConflictException,
  DomainException,
  ExceptionBase,
  NotFoundException,
  UnauthorizedException,
} from '@exceptions';
import {
  CallHandler,
  ConflictException as NestConflictException,
  ExecutionContext,
  ForbiddenException as NestForbiddenException,
  NestInterceptor,
  NotFoundException as NestNotFoundException,
  UnauthorizedException as NestUnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof DomainException) {
          throw new NestForbiddenException(err.message);
        }
        if (err instanceof UnauthorizedException) {
          throw new NestUnauthorizedException(err.message);
        }
        if (err instanceof NotFoundException) {
          throw new NestNotFoundException(err.message);
        }
        if (err instanceof ConflictException) {
          throw new NestConflictException(err.message);
        }
        return throwError(err);
      }),
    );
  }
}
