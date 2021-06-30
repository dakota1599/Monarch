import CheckIn from "./CheckIn";

export default interface Member{

    Id?: any;
    Name: string;
    UserName: string;
    Password: string;
    AccountOwnerID: any;
    AccountOwner: string;
    CheckIns?: CheckIn[];

}