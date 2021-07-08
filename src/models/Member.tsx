import CheckIn from "./CheckIn";
import Meeting from "./Meeting";

export default interface Member{

    id?: any;
    name: string;
    userName: string;
    password: string;
    orgID: any;
    org: string;
    admin: boolean;
    meetings?: Meeting[];
    checkIns?: CheckIn[];

}