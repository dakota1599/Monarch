export default class CurrentUser {
  constructor(
    public id: number,
    public username: any,
    public name: any,
    public admin: boolean,
    public orgId: number,
    public org: any
  ) {}
}
