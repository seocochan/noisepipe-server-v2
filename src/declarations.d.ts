import { UserPrincipal } from './interface-adapters/interfaces/auth/user-principal.interface';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends UserPrincipal {}
  }
}
