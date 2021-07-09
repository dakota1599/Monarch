import { useRef, useState } from "react";
import MeetingService from "../../services/MeetingService";
import Meeting from "../../models/Meeting";
import MemberService from "../../services/MemberService";

import "./createmeeting.style.scss";


const CreateMeeting = (props: {memberId: number, callRefresh:any}) => {

    //The variable that will hold the meeting name.
    var name = useRef("");

    //State var that will hold error information to display in return.
    const [error, setError] = useState<JSX.Element>();

    const create = async () => {
        //If name is not set, run error and return.
        if(name.current === ""){
            setError(<span style={{color: 'red'}}>Meeting name must not be blank</span>);
            return;
        }
        //Pull member information from the database to construct a meeting and push to server for processing.
        let member = (await MemberService.GetMember(props.memberId)).data;
        let meeting = new Meeting(name.current, member.id, member.name, member.orgID);
        let res = (await MeetingService.CreateMeeting(meeting));

        //If response is false, run error messaging.  Else call parent refreshing.
        if(!res){
            alert("Error creating this meeting.");
        }else{
            props.callRefresh();
        }
    }
    
    return(
        <div className="create-meeting">
            <input type="text" placeholder="Meeting name..." className="form-control" onChange={(e) => name.current = e.target.value}/>
            <br/>
            <button type="button" className="btn btn-success" onClick={() => create()}>Create</button>
            {error}
        </div>
    )
}

export default CreateMeeting;