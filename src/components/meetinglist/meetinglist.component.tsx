import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckIn from "../../models/CheckIn";
import Meeting from "../../models/Meeting";
import CheckInService from "../../services/CheckInService";
import MeetingService from "../../services/MeetingService";
import CreateMeeting from "../createmeeting/createmeeting.component";

import "./meetinglist.style.scss";

const MeetingList = forwardRef(
  (props: { orgId: number; userId: number; chosenMeeting: any }, ref) => {
    //Meeting and checkin state arrays
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [checkins, setCheckins] = useState<CheckIn[]>([]);

    const [meetingView, setMeetingView] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState<Meeting>();

    const [createMeeting, setCreateMeeting] = useState(false);
    const [modifyMeeting, setModifyMeeting] = useState(false);

    var newMeetingName: string = "";

    //Gets meetings upon load
    useEffect(() => {
      getMeetings(props.orgId);
    }, []);

    //Function for getting meetings
    async function getMeetings(orgId: number) {
      let recMeetings = (await MeetingService.GetOrgMeetings(orgId)).data;

      setMeetings(recMeetings);
    }

    //Gets the list of checkins related to this meeting.
    async function getCheckins(meetId: number) {
      let recCheckins = (await CheckInService.GetCheckInsList(meetId)).data;

      setCheckins(recCheckins);
    }

    //This is an object created to pass by reference to the parent component so it can
    //call an action in this component when it has completed adding a checkin.
    useImperativeHandle(ref, () => ({
      rerender() {
        //Get a refreshed checkin list if currentMeeting is not undefined
        if (currentMeeting !== undefined) {
          getCheckins(currentMeeting.id);
        }
      },
    }));

    //Sets up the meeting view
    function setupMeetingView(meeting: Meeting) {
      //Sets the meeting view
      setMeetingView(true);
      //Sends the chosen meeting back to the dashboard if the user owns this meeting.
      if (meeting.ownerID === +props.userId) {
        props.chosenMeeting(meeting);
      }
      setCurrentMeeting(meeting);

      getCheckins(meeting.id);
    }

    async function deleteMeeting(meeting: Meeting) {
      let res = (await MeetingService.DeleteMeeting(meeting.id)).data;

      if (!res) {
        alert("Error deleting this meeting.");
        return;
      }
      setMeetingView(false);
      refreshMeeting();
    }

    //Function for saving the modified meeting.
    async function saveModifiedMeeting(meeting: Meeting, change: string) {
      //If change is not empty...
      if (change !== "") {
        //...set meeting incoming meeting name to change
        meeting.name = change;
        //then run the http request.
        let res = (await MeetingService.EditMeeting(meeting)).data;

        //If res comes back false, that means there was a failure.  Run error message.
        if (!res) {
          alert("Error editing meeting name.");
          //Set to false.
          setModifyMeeting(false);
        }
      }
    }

    //Removes a checkin
    async function removeCheckin(check: CheckIn) {
      let res = (await CheckInService.DeleteCheckIn(check.id)).data;

      //If res is false, then run error alert.
      if (!res) {
        alert("Failed to remove user from this meeting.");
      } else {
        //If currentMeeting is not undefined, run new list of checkins.
        if (currentMeeting !== undefined) {
          getCheckins(currentMeeting.id);
        }
      }
    }

    //For refreshing the meeting list after the creating and deleting a meeting.
    function refreshMeeting() {
      getMeetings(props.orgId);
      setCreateMeeting(false);
    }

    if (!meetingView) {
      //Returned JSX
      return (
        <div>
          <h3>
            Meetings{" "}
            <button
              type="button"
              className="back"
              onClick={() => setCreateMeeting(!createMeeting)}
            >
              +
            </button>
          </h3>
          <div className="mon-table-container">
            <table className="table mon-table">
              <tbody>
                {meetings.map((meeting: Meeting, index) => (
                  <tr
                    key={meeting.id}
                    onClick={() => setupMeetingView(meeting)}
                  >
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
          {createMeeting ? (
            <CreateMeeting
              callRefresh={refreshMeeting}
              memberId={props.userId}
            />
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h3>
            <button
              className="back"
              onClick={() => {
                setMeetingView(false);
                setCurrentMeeting(undefined);
                setModifyMeeting(false);
                props.chosenMeeting(undefined);
              }}
            >
              &times;
            </button>{" "}
            {modifyMeeting ? (
              <input
                type="text"
                onChange={(e) => (newMeetingName = e.target.value)}
                className="form-control"
                placeholder={currentMeeting!.name}
              />
            ) : (
              currentMeeting!.name
            )}
            
            &nbsp;

            <NavLink
              className="btn btn-success"
              to={`/start/${currentMeeting?.id}`}
            >
              Start
            </NavLink>
            
            &nbsp;

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                //If modifyMeeting is false, set newMeetingName to currentMeeting
                //and set modifyMeeting to true.
                if (!modifyMeeting) {
                  newMeetingName = currentMeeting!.name;
                  setModifyMeeting(!modifyMeeting);
                  //Return to escape from further conditions.
                  return;
                }

                //If modifyMeeting is truw and newMeetingName is not empty, run
                //all save procedures.
                if (modifyMeeting && newMeetingName !== "") {
                  saveModifiedMeeting(currentMeeting!, newMeetingName);
                  setModifyMeeting(!modifyMeeting);
                } else if (newMeetingName === "") {
                  setModifyMeeting(!modifyMeeting);
                }
              }}
            >
              {modifyMeeting ? "Save" : "Modify"}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (
                  // eslint-disable-next-line no-restricted-globals
                  confirm(
                    `Are you sure you wish to delete ${currentMeeting!.name}`
                  )
                ) {
                  deleteMeeting(currentMeeting!);
                }
              }}
            >
              Delete
            </button>
          </h3>
          <div className="mon-table-container">
            <table className="table mon-table">
              <tbody>
                {checkins !== []
                  ? checkins.map((checkin: CheckIn) => (
                      <tr key={checkin.id}>
                        <td>{checkin.memberName}</td>
                        <td>
                          {currentMeeting!.ownerID === +props.userId ? (
                            <button
                              type="button"
                              onClick={() => {
                                removeCheckin(checkin);
                              }}
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : "No one has been assigned to this meeting."}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
);

export default MeetingList;
