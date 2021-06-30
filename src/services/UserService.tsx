import http from './../util/http';
import {IUser, LogCreds} from './../models/User';


export default class UserService{

    //For creating a user.
    public static CreateUser(user: IUser){
        return http.post('user', user);
    }
    //For logging a user in
    public static Login(cred: LogCreds){
        return http.post('user/log', cred);
    }


}