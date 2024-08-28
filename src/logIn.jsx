import "./signIn.css"
import React, { useRef, useState } from 'react';
import { logInUserData } from "./createUser.js";

let changePage = false;
function LogInPage({setAccess ,  className }){
    const [fill , setFill] = useState(false)
    const [tasks, setTasks] = useState([]);
    let firstName = useRef(null)
    let lastName = useRef(null)

function changePageToCreate(){
setAccess(4)
}


    async  function SubmitSignIn(){
      
        let first = firstName.current.value;
        let last = lastName.current.value;
      if (first && last) {
        let changePage = false;
        changePage = await logInUserData(firstName, lastName);

          {changePage ? setAccess(1) : setAccess(2)} 
      }else{
        setFill(true)
      }
        }

      
  
    
    return(
        <>
         <div className={className}>
<h1 className="title">Log in</h1>

        <div className="card" >
        <label>
   Username
   </label>
    <input
      type="text"
      ref={firstName}
      placeholder="Enter your username"
      className="nameInput"
    />

  <label>
    Password
    </label>
    <input
      type="text"
      ref={lastName}
      placeholder="Enter your password"
      className="passwordInput"
    />

        <div>
        <button onClick={SubmitSignIn}>Log In</button>
        <button className="second-btn" onClick={changePageToCreate}>Create Account</button>
        </div>
        

      
      </div>
{fill ? <h1 className="para-error"> Fill The Blanks</h1> : "" }
</div>
</>

    )
   

}

export{LogInPage }