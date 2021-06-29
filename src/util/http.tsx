import axios from 'axios';

//This creates an axios object and exports it out.
//When imported it can be called anything.
export default axios.create({
    baseURL: 'http://localhost:44378/api/',
    headers: {
        "Content-type": "application/json"
      }
});