import http from "../util/http";
import Member from "../models/Member";
import { LogCreds } from "../models/User";

export default class MemberService{

    //Creates a new member
    public static CreateMember(member:Member){
        return http.post("member", member);
    }

    //Gets a member by id
    public static GetMember(id:any){
        return http.get(`member/${id}`);
    }

    //Logs a member in
    public static LogIn(creds:LogCreds){
        return http.post("member/log", creds);
    }

    //Deletes a member
    public static DeleteMember(id:any){
        return http.delete(`member/${id}`);
    }


}