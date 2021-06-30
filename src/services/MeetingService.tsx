import http from "../util/http";
import Meeting from "../models/Meeting";

export default class MeetingService{

    //Creates a meeting
    public CreateMeeting(meeting:Meeting){
        return http.post("meeting", meeting);
    }

    //Deletes a meeting
    public DeleteMeeting(id: any){
        return http.delete(`meeting/${id}`);
    }

}