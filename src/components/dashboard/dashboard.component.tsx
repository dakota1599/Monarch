import "./dashboard.style.scss";
import { useState } from "react";
import CurrentUser from "../../models/CurrentUser";


const Dashboard = (props: {currentUser: CurrentUser}) => {

    return(
        <div id="body">
            <h1>{props.currentUser.name}'s Dashboard</h1>
            
        </div>
    );
}

export default Dashboard;