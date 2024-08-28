import "./input.css"
import React, { useRef, useState ,useEffect, forwardRef } from 'react';
import { deleteTask} from "./api.js";
import { handleChange  as createTask , updatefetchData as updateTask} from './createData.js';


function InputField ({setAccess}){
    const jwtToken = localStorage.getItem("jwt");
    const deletedTask = localStorage.getItem('deletedTaskId');

    const [compelete , setCompelet] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [des, setDes] = useState([]);
    const [error, setError] = useState(false);
    const inputVal = useRef(null);
    const descriptionVal = useRef(null);
    const isComplete = useRef(false);
    let count = 1 

    useEffect(() => {
        const fetchTasks = async (id) => {
       
    
          try {
            const response = await fetch(`http://localhost:3001/task/${id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log("data", data);
            setTasks(data);
            console.log(data[0]?.owner_id);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
    
        fetchTasks();
      }, []);



    async function onChangeHandler() {
        await createTask(inputVal, descriptionVal, setDes, setInputs, isComplete, setError);
    }




    function logOutonClick() {
        const jwtToken = localStorage.getItem("jwt");
        if (jwtToken) {
            localStorage.removeItem("jwt"); 
            console.log("JWT token has been removed."); 
            setAccess(2);
        } else {
            console.log("No JWT token found."); 
            console.log(jwtToken)
            setAccess(2);
        }
    }


     const  removeTaskEvent = async (index, isInput = true) => {
        if (isInput) {
            setInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
            
        } else {
            
            setTasks(prevTasks => prevTasks.filter(task => task.id !== index));
            await deleteTask(index)
        }
    };



    const completeTaskEvent = async (index , title , description , compelete  ) => {
       let compeleteValue = isComplete.current
       console.log("1 =>" , compeleteValue)
        console.log(index)
        if(!compeleteValue){
       console.log( "3",compeleteValue)
       compeleteValue = !compeleteValue;
       isComplete.current = compeleteValue;
       console.log("Toggled value =>", compeleteValue);
       await updateTask(index , title, description , compelete )
        }
            else if(compeleteValue){
            console.log( "4",compeleteValue)
            compeleteValue = !compeleteValue;
            isComplete.current = compeleteValue;
            console.log("Toggled value =>", compeleteValue);
            await updateTask(index , title, description , compelete  )
        }
        console.log("last one =>" , compeleteValue)
        return compeleteValue
    };
   

    return (
        <>
            <div className="todo-container">
            <h1 className="title">Todo List</h1>
            <div className='input'>
            <label className="title1">
    Title
    </label>
                <input
                    type="text"
                    ref={inputVal}
                    placeholder={error ? "Fill the blank" : "Type something..."}
                    className={error ? 'error' : ''}
                />
                  <label className="title2">
    Description
    </label>
                <input
                    type="text"
                    ref={descriptionVal}
                    placeholder={error ? "Fill the blank" : "Type your description..."}
                    className={error ? 'error' : ''}
                />
                <button className="main-btn" onClick={onChangeHandler}>Submit</button>
            </div>
            <div className='task-list'>

{/* show task when is created */}
                
            {inputs.map((input, index) => (
                <div key={index} className='task-item'>
                    <input type="checkbox" className="compelete-btn" onClick={() => completeTaskEvent(index)} />
                    <h2>{input}</h2>
                    {des[index] && <p>{des[index]}</p>}
                    <p>{isComplete.current ? 'Completed' : ' Not compelet'}</p>
                    {console.log("value of compelete =>" , isComplete.current)}
                    <button className="remove-btn" onClick={() => removeTaskEvent(index)}>Remove</button>
                </div>
            ))}


{/* get task with query and show it */}
            {tasks.map((task ) => (
                <div key={task.id} className='task-item'>
                    <input type="checkbox" className="compelete-btn" onClick={() => completeTaskEvent(task.id, task.title , task.description , isComplete)} />
                    <h2>{task.title}</h2>
                    {task.description && <p>{task.description}</p>}
                    <p>{task.is_completed ? "Completed" : 'Not compelet'}</p>
                    {/* {console.log("value of compelete =>" , isComplete.current)} */}
                    <button className="remove-btn" onClick={() => removeTaskEvent(task.id, false)}>Remove</button>
                </div>
            ))}
        </div>

            <button className="log-out" onClick={logOutonClick}>Log Out</button>
        </div>
        </>
    );
};

export { InputField };
