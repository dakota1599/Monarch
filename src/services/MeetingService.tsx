import http from "../util/http";
import Meeting from "../models/Meeting";

export default class MeetingService{

    //Gets a meeting by id
    public static GetMeeting(id:any){
        return http.get(`meeting/${id}`);
    }

    //Creates a meeting
    public static CreateMeeting(meeting:Meeting){
        return http.post("meeting", meeting);
    }

    //Deletes a meeting
    public static DeleteMeeting(id: any){
        return http.delete(`meeting/${id}`);
    }

    public static EditMeeting(meeting:Meeting){
        return http.put(`meeting`, meeting);
    }

    public static GetOrgMeetings(orgId: any){
        return http.get(`meeting/org/${orgId}`);
    }

}