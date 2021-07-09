import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CheckIn from "../../models/CheckIn";
import Meeting from "../../models/Meeting";
import CheckInService from "../../services/CheckInService";
import MeetingService from "../../services/MeetingService";
import CreateMeeting from "../createmeeting/createmeeting.component";

import "./meetinglist.style.scss";

const MeetingList = forwardRef((props: {orgId: number, userId: number, chosenMeeting:any}, ref) => {

    //Meeting and checkin state arrays
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [checkins, setCheckins] = useState<CheckIn[]>([]);

    const [meetingView, setMeetingView] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState<Meeting>();

    const [createMeeting, setCreateMeeting] = useState(false);


    //Gets meetings upon load
    useEffect(() => {
        getMeetings(props.orgId);
    }, []);


    //Function for getting meetings
    async function getMeetings(orgId:number){
        let recMeetings = (await MeetingService.GetOrgMeetings(orgId)).data;

        setMeetings(recMeetings);
    }

    //Gets the list of checkins related to this meeting.
    async function getCheckins(meetId:number){
        let recCheckins = (await CheckInService.GetCheckInsList(meetId)).data;

        setCheckins(recCheckins);
    }

    //This is an object created to pass by reference to the parent component so it can
    //call an action in this component when it has completed adding a checkin.
    useImperativeHandle(ref, () => ({
      rerender(){
        //Get a refreshed checkin list if currentMeeting is not undefined
        if(currentMeeting !== undefined){
          getCheckins(currentMeeting.id);
        }
      }
    }))

    //Sets up the meeting view
    function setupMeetingView(meeting: Meeting){
        //Sets the meeting view
        setMeetingView(true);
        //Sends the chosen meeting back to the dashboard if the user owns this meeting.
        if(meeting.ownerID === +props.userId){
          props.chosenMeeting(meeting);
        }
        setCurrentMeeting(meeting);

        getCheckins(meeting.id);
        
    }

    //Removes a checkin
    async function removeCheckin(check: CheckIn){
      let res = (await CheckInService.DeleteCheckIn(check.id)).data;

      //If res is false, then run error alert.
      if(!res){
        alert("Failed to remove user from this meeting.");
      }else{
        //If currentMeeting is not undefined, run new list of checkins.
        if(currentMeeting !== undefined){
          getCheckins(currentMeeting.id);
        }
      }
    }

    //For refreshing the meeting list after the creating and deleting a meeting.
    //For deleting a meeting, create back end that runs through and deletes all the checkins too.
    function refreshMeeting(){
      getMeetings(props.orgId);
      setCreateMeeting(false);
    }


    if (!meetingView) {
      //Returned JSX
      return (
        <div>
          <h3>Meetings <button type="button" className="back" onClick={() => setCreateMeeting(!createMeeting)}>+</button></h3>
          <div className="mon-table-container">
          <table className="table mon-table">
            <tbody>
              {meetings.map((meeting: Meeting, index) => (
                <tr key={meeting.id} onClick={() => setupMeetingView(meeting)}>
                  <td>
                    <strong>{meeting.name}</strong>
                  </td>
                  <td>
                    {meeting.ownerID === +props.userId
                      ? "(Yours)"
                      : `${meeting.owner}'s`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {createMeeting ? <CreateMeeting callRefresh={refreshMeeting} memberId={props.userId}/> : ""}
        </div>
      );
    }else{
        return (
          <div>
            <h3><button className="back" onClick={() => {setMeetingView(false); setCurrentMeeting(undefined); props.chosenMeeting(undefined)}}>&times;</button> {currentMeeting!.name}</h3>
            <div className="mon-table-container">
            <table className="table mon-table">
              <tbody>
                {
                    checkins !== [] ? (checkins.map((checkin:CheckIn) => (
                        <tr key={checkin.id}>
                            <td>
                                {checkin.memberName}
                            </td>
                            <td>
                                <button type="button" onClick={() => {removeCheckin(checkin)}} className="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                    ))) : "No one has been assigned to this meeting."
                }
              </tbody>
            </table>
            </div>
          </div>
        );
    }
})

export default MeetingList;