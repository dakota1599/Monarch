import CheckIn from "./CheckIn";

export default class Meeting {
  constructor(
    public name: string,
    public ownerID: any,
    public owner: string,
    public orgID: any,
    public id?: any,
    public checkIns?: CheckIn[]
  ) {}
}
