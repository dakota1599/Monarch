import "./dashboard.style.scss";
import { useState, useRef } from "react";
import CurrentUser from "../../models/CurrentUser";
import MemberList from "../memberlist/memberlist.component";
import MeetingList from "../meetinglist/meetinglist.component";


const Dashboard = (props: {currentUser: CurrentUser}) => {

    const [currentMeeting, setCurrentMeeting] = useState(-1);

    return(
        <div id="body" className="container">
            <h1>{props.currentUser.name}'s Dashboard</h1>
            <div className="row">
                <div className="col-sm-6">
                    <MemberList userId={props.currentUser.orgId} org={props.currentUser.org}/>
                </div>
                <div className="col-sm-6">
                    <MeetingList orgId={props.currentUser.orgId} userId={props.currentUser.id} chosenMeeting={(ind:number) => {setCurrentMeeting(ind)}}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;