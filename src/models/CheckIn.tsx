export default class CheckIn {
  constructor(
    public meetingID: any,
    public meetingName: string,
    public memberID: any,
    public memberName: string,
    public checkedIn: boolean,
    public id?: any
  ) {}
}
