export class SearchUserCommand {
  constructor(props: SearchUserCommand) {
    Object.assign(this, props);
  }

  query!: string;
  page!: number;
  size!: number;
}
