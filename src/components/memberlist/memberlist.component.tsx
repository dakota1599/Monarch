import MemberService from "../../services/MemberService";
import React,{ useEffect, useState, useRef } from "react";
import Member from "../../models/Member";
import CheckIn from "../../models/CheckIn";

import "./memberlist.style.scss";




const MemberList = (props: {userId: number}) => {

  const [list, setList] = useState<Member[]>([]);
  const [edit, setEdit] = useState<JSX.Element>();

  //Modification variables
  var name = useRef("");
  var userName = useRef("");
  
  useEffect(()=>{
    GetList(props.userId);
  }, [])

  //Gets the list initially
  async function GetList(id: number) {
    let getList: Member[] = (await MemberService.GetMemberList(id)).data;

    setList(getList);
  }

  async function PushUpdate(id: number){
    if(name.current == "" || userName.current == ""){
      alert("Name and Username must not be empty.");
      return;
    }
    

  }

  //For altering a member.
  async function AlterMember(del: boolean, id: number){
    let response;
    //For deleting a member
    if(del){
      //User confirms if they want to delete this member.
      // eslint-disable-next-line no-restricted-globals
      if(confirm("Are you sure you wish to delete this member?")){
        //The deletion request is sent and response is received.
        response = (await MemberService.DeleteMember(id)).data;

        //If response is not false...
        if(response !== false){
          //...update the list state.
          GetList(props.userId);
          //Alert user of completion of task.
          alert(`${response} has successfully been delete.`);
        }else{
          //Alert user of failure of task.
          alert("Error: Unable to delete member at this time.");
        }
      }
    }else{
      //Set modification vars to initial values.
      name.current = list[id].name;
      userName.current = list[id].userName;
      setEdit(
        <div className="input-group" style={{ margin: "auto" }}>
          <input
            className="modify-input"
            type="text"
            placeholder={list[id].name}
            defaultValue={list[id].name}
            onChange={(e) => name.current = e.target.value}
          />
          <input
            className="modify-input"
            type="text"
            placeholder={list[id].userName}
            defaultValue={list[id].userName}
            onChange={(e) => userName.current = e.target.value}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {PushUpdate(list[id].id)}}
          >
            Save
          </button>
        </div>
      );
    }

  }

  console.log(list);

  if (list !== undefined) {
    return (
      <div>
        <h1>Your Members</h1>
        <table className="table mon-table">
          <tbody>
            {list.map((member: Member, index) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.userName}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => AlterMember(false, index)}>Modify</button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => AlterMember(true, member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {edit}
      </div>
    );
  } else {
    return <h3 style={{ color: "red" }}>Error: Undefined member list.</h3>;
  }
}

export default MemberList;