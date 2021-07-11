import http from "../util/http";
import CheckIn from "../models/CheckIn";

export default class CheckInService{

    //Creates a checkin
    public static CreateCheckIn(check:CheckIn){
        return http.post("checkin", check);
    }

    //Deletes a checkin
    public static DeleteCheckIn(id:any){
        return http.delete(`checkin/${id}`);
    }

    public static GetCheckInsList(meetId: any){
        return http.get(`checkin/meeting/${meetId}`);
    }

    public static AlterStatus(id: any){
        return http.put(`checkin/${id}`);
    }

}