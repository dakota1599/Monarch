import "./dashboard.style.scss";
import { useState, useRef, useEffect } from "react";
import CurrentUser from "../../models/CurrentUser";
import MemberList from "../memberlist/memberlist.component";
import MeetingList from "../meetinglist/meetinglist.component";
import Member from "../../models/Member";
import CheckIn from "../../models/CheckIn";
import Meeting from "../../models/Meeting";
import CheckInService from "../../services/CheckInService";


const Dashboard = (props: {currentUser: CurrentUser}) => {

    const [currentMeeting, setCurrentMeeting] = useState<Meeting>();

    const ref = useRef<any>();


    const addMember = async (member: Member) => {
        if(currentMeeting !== undefined){
            let check = new CheckIn(currentMeeting.id, currentMeeting.name, member.id, member.name, false);

            let res = (await CheckInService.CreateCheckIn(check)).data;

            if(!res){
                alert("Failed to add member to meeting.");
            }else{
                if(ref !== undefined){
                    ref.current.rerender();
                }
            }
        }
    }

    return(
        <div id="body" className="container">
            <h1>{props.currentUser.name}'s Dashboard</h1>
            <div className="row">
                <div className="col-sm-6">
                    <MemberList userId={props.currentUser.orgId} org={props.currentUser.org} selectMember={addMember}/>
                </div>
                <div className="col-sm-6">
                    <MeetingList ref={ref} orgId={props.currentUser.orgId} userId={props.currentUser.id} chosenMeeting={(meeting: Meeting) => {setCurrentMeeting(meeting)}}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;