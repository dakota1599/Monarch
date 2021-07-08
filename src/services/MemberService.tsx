import http from "../util/http";
import Member from "../models/Member";
import LogCreds from "../models/LogCreds";

export default class MemberService{

    //Creates a new member
    public static CreateMember(member:Member){
        return http.post("member", member);
    }

    //Gets a member by id
    public static GetMember(id:any){
        return http.get(`member/${id}`);
    }

    //Gets list of members by user id
    public static GetMemberList(id: any){
        return http.get(`member/list/${id}`);
    }

    //Logs a member in
    public static Login(creds:LogCreds){
        return http.post("member/log", creds);
    }

    //Deletes a member
    public static DeleteMember(id:any){
        return http.delete(`member/${id}`);
    }


}