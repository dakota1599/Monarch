import http from "../util/http";
import CheckIn from "../models/CheckIn";

export default class CheckInService{

    //Creates a checkin
    public CreateCheckIn(check:CheckIn){
        return http.post("checkin", check);
    }

    //Deletes a checkin
    public DeleteCheckIn(id:any){
        return http.delete(`checkin/${id}`);
    }

}