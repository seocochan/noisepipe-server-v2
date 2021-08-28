export class SigninResponse {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  accessToken: string;
}
