
export interface IUser{

    Id?: any;
    Name: string;
    UserName: string;
    Password: string;
    CheckedIn: boolean;

}

export interface ILogCreds{
    UserName: string;
    Password: string;
}