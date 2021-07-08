import { useEffect, useState } from "react";
import CheckIn from "../../models/CheckIn";
import Meeting from "../../models/Meeting";
import CheckInService from "../../services/CheckInService";
import MeetingService from "../../services/MeetingService";

const MeetingList = (props: {orgId: number, userId: number, chosenMeeting:any}) => {

    //Meeting and checkin state arrays
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [checkins, setCheckins] = useState<CheckIn[]>([]);

    const [meetingView, setMeetingView] = useState(false);


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



    //Sets up the meeting view
    function setupMeetingView(i: number){
        setMeetingView(true);
        props.chosenMeeting(i);

        getCheckins(i);
        
    }

    //Removes a checkin
    function removeCheckin(check: CheckIn){

    }


    if (!meetingView) {
      //Returned JSX
      return (
        <div>
          <h3>Meetings</h3>
          <table className="table mon-table">
            <tbody>
              {meetings.map((meeting: Meeting, index) => (
                <tr key={meeting.id} onClick={() => setupMeetingView(meeting.id)}>
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
      );
    }else{
        return (
          <div>
            <button type="button" className="btn btn-primary">
              Back
            </button>
            <h3>{checkins[0].meetingName}</h3>
            <table className="table mon-table">
              <tbody>
                {
                    checkins.map((checkin:CheckIn) => (
                        <tr>
                            <td>
                                {checkin.memberName}
                            </td>
                            <td>
                                <button type="button" onClick={() => {removeCheckin(checkin)}} className="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        );
    }
}

export default MeetingList;