export class SearchUsersCommand {
  constructor(props: SearchUsersCommand) {
    Object.assign(this, props);
  }

  query!: string;
  page!: number;
  size!: number;
}
