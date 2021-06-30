import CheckIn from "./CheckIn";
import Meeting from "./Meeting";
import Member from "./Member";

export interface IUser{

    Id?: any;
    Name: string;
    UserName: string;
    Password: string;
    Meetings?: Meeting[];
    Members?: Member[];

}

export interface ILogCreds{
    UserName: string;
    Password: string;
}