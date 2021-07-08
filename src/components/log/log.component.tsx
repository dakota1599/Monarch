import React, { useRef, useState } from "react";
import MemberService from "../../services/MemberService";
import LogCreds from "../../models/LogCreds";
import "./log.style.scss";

const Log = () => {

    //Log status is used to log if an incorrect log attempt is made.
    const [logStatus, setLogStatus] = useState(<span></span>);
    //Two vars that will hold the username and password info.
    var user = useRef("");
    var password = useRef("");

    //Function for handeling the login.
    async function handleLog(){

        //Validates to ensure that the user and password are not empty.
        if(user.current === "" || password.current === ""){
            setLogStatus(<span className="text-danger">Username and password must not be empty.</span>)
            return;
        }

        //Creates the credential object.
        let log: LogCreds = new LogCreds(user.current,password.current);
        //If admin, use user service.
        let creds = (await MemberService.Login(log)).data;
        validate(creds);

    }

    //This is used to validate if server validation was passed.
    function validate(creds: any){
        if(creds !== false){
            window.localStorage.setItem('username', creds.userName);
            window.localStorage.setItem('name', creds.name);
            window.localStorage.setItem('userId',creds.id);
            window.localStorage.setItem('admin', creds.admin);
            window.localStorage.setItem('orgId', creds.orgID);
            window.localStorage.setItem('org',creds.org);
            window.location.reload();
        }else{
            setLogStatus(<span className="text-danger">Username or password is incorrect</span>);
        }
        console.log(creds);
    }




    return(
        <div className="panel-warning login">
            <div className="panel-heading">
                Member Log In
            </div>
            <div className="panel-body logBody">
                <input type="text" className="form-control" placeholder="Username" onChange={(e) => {user.current = e.target.value}}/>
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => {password.current = e.target.value}}/>
                {logStatus}
                <br/>
                <button type="button" className="btn btn-warning" onClick={() => handleLog()}>Enter</button>
            </div>
        </div>
    );

}

export default Log;

