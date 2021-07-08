import http from "../util/http";
import Meeting from "../models/Meeting";

export default class MeetingService{

    //Creates a meeting
    public static CreateMeeting(meeting:Meeting){
        return http.post("meeting", meeting);
    }

    //Deletes a meeting
    public static DeleteMeeting(id: any){
        return http.delete(`meeting/${id}`);
    }

    public static GetOrgMeetings(orgId: any){
        return http.get(`meeting/org/${orgId}`);
    }

}