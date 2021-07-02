import "./dashboard.style.scss";
import { useState } from "react";
import CurrentUser from "../../models/CurrentUser";
import MemberList from "../memberlist/memberlist.component";


const Dashboard = (props: {currentUser: CurrentUser}) => {

    return(
        <div id="body" className="container">
            <h1>{props.currentUser.name}'s Dashboard</h1>
            <div className="row">
                <div className="col-sm-6">
                    <MemberList userId={props.currentUser.id}/>
                </div>
                <div className="col-sm-6">
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;