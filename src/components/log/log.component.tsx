import React, { useState } from "react";
import "./log.style.scss";

const Log = () => {

    const [logStatus, setLogStatus] = useState(false);
    var user: string;
    var password: string;




    return(
        <div className="panel-warning login">
            <div className="panel-heading">
                Log In
            </div>
            <div className="panel-body logBody">
                <input type="text" className="form-control" placeholder="Username" onChange={(e) => {user = e.target.value}}/>
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => {password = e.target.value}}/>
            </div>
        </div>
    );

}

export default Log;

