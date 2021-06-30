import { useState } from 'react';
import Log from '../components/log/log.component';
import Dashboard from '../components/dashboard/dashboard.component';
import './../styles/home.scss';
import CurrentUser from '../models/CurrentUser';
const HomePage = (props: {currentUser: CurrentUser}) => {


    if(props.currentUser.username === undefined){
      return (
        <div>
          <div className="title">
            <h1>Welcome to Monarch</h1>
            <p>Please log in with your Monarch Credentials</p>
            <br/>
            <Log/>
          </div>
        </div>
      );
  
    }else{
      return(
        <Dashboard currentUser={props.currentUser}/>
      );
    }
}

export default HomePage;