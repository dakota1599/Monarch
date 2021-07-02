import CheckIn from "./CheckIn";

export default interface Member{

    id?: any;
    name: string;
    userName: string;
    password: string;
    accountOwnerID: any;
    AccountOwner: string;
    checkIns?: CheckIn[];

}