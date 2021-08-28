export interface UserToken {
  sub: string;
  iat?: string;
  exp?: string;
  id: string;
  username: string;
  roles: string[];
}
