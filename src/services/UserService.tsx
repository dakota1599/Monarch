import http from './../util/http';
import {IUser, ILogCreds} from './../models/User';


export default class UserService{

    //For creating a user.
    public CreateUser(user: IUser){
        return http.post('/user', user);
    }
    //For logging a user in
    public Login(cred: ILogCreds){
        return http.post('user/log', cred);
    }


}