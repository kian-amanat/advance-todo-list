import "./signIn.css"
import React, { useRef, useState } from 'react';
import { getUserData , createUserData } from "./apiUser.js";
import { createdUserData } from "./createUser.js";


function SignInPage({setAccess , className}){
   const [fill , setFill] = useState(false)


    let firstName = useRef(null)
    let lastName = useRef(null)

    function changePage(){
        setAccess(2)
    }


    async  function SubmitSignIn(){
        let first = firstName.current.value;
        let last = lastName.current.value;
      if (first && last) {
   let checkCreatedUser =  await createdUserData(firstName , lastName)
   {checkCreatedUser ? setAccess(2) : setAccess(5)} 
  
      }else{
        setFill(true)
      }
        }

      
  
    
    return(
        <>
        <div className={className}>
        <h1 className="title">Create Account</h1>

        <div className="card">
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
    <button className="submit-btn" onClick={SubmitSignIn}>Submit</button>
    <button className="logIn-btn" onClick={changePage}>Log In</button>
    </div>
        
      </div>
{fill ? <h1 className="para-error"> Fill The Blanks</h1> : "" }
</div>
</>

    )
   

}


export {SignInPage} ;