import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckIn from "../../models/CheckIn";
import Meeting from "../../models/Meeting";
import CheckInService from "../../services/CheckInService";
import MeetingService from "../../services/MeetingService";

import "./meetingstart.style.scss";

const MeetingStart = (props: { meetingId: any }) => {
    //Meeting state
  const [meeting, setMeeting] = useState<Meeting>();
  //Quorum reference
  const quorum = useRef(0);
  let history = useHistory();

  //Function for getting the meeting
  async function getMeeting(id: number) {
    //Makes http request for meeting with passed id.
    let meet:Meeting = (await MeetingService.GetMeeting(id)).data;

    //If meet is false, redirect to home
    if (!meet) {
      history.push("/");
      return;
    }
    //Sets the meeting
    setMeeting(meet);
    
  }

  //Function for checking in.
  async function checkIn(check: CheckIn){
    //Makes http request to toggle checkin status.
    let res = (await CheckInService.AlterStatus(check.id)).data;

    //If res is false, run error alert.
    if(!res){
        alert("Failed to update status");
        return;
    }
    //Update meeting if res is true.
    getMeeting(props.meetingId);
  }

  //Gets the meeting object on first load.
  useEffect(() => {
    getMeeting(props.meetingId);
  }, []);

  //If meeting is not undefined, set quorum to zero and count number of people checkin.
  if (meeting !== undefined) {
    quorum.current = 0;
    for(var check of meeting.checkIns!){
        if(check.checkedIn){
            quorum.current += 1;
            
        }
    }

    //Message object
    let message: JSX.Element;
    //The benchmark for reaching quorum
    let bench = meeting.checkIns?.length! / 2;

    //If quorum is not reached, message accordingly.
    if (quorum.current <= bench) {
      message = <span style={{color: 'red'}}>Quorum not met {quorum.current}/{meeting.checkIns?.length!}</span>;
    }
    //If quorum is reached, message accordingly.
    else {
      message = <span style={{color: 'darkgreen'}}>Quorum met {quorum.current}/{meeting.checkIns?.length!}</span>;
      console.log("Over");
    }

    //Return the quorum list.
    return (
      <div className="body">
        <h2>{meeting.name}</h2>
        <h4>{message}</h4>
        <div className="members">
          <ul className="list-group">
            {meeting.checkIns!.map((checkin: CheckIn) => (
              <li key={checkin.id} className="list-group-item item" 
                style={{backgroundColor: checkin.checkedIn ? "lightgreen" : "orange"}}
                onClick={() => checkIn(checkin)}
              >{checkin.memberName}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
};

export default MeetingStart;
