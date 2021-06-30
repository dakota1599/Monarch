import http from "../util/http";
import Member from "../models/Member";
import { ILogCreds } from "../models/User";

export default class MemberService{

    //Creates a new member
    public CreateMember(member:Member){
        return http.post("member", member);
    }

    //Gets a member by id
    public GetMember(id:any){
        return http.get("member", id);
    }

    //Logs a member in
    public LogIn(creds:ILogCreds){
        return http.post("member/log", creds);
    }

    //Deletes a member
    public DeleteMember(id:any){
        return http.delete(`member/${id}`);
    }


}