import react from 'react'
import axios from 'axios'

const API = ()=>{
    const [todo, setTodo] = react.useState([]);
    const [done, setDone] = react.useState([]);
    const [createInput, setCreateInput] = react.useState([]);
    const [createTime, setCreateTime] = react.useState([]);
    react.useEffect(() => {
        console.log("did mount");
        fetchTodoTask();
        fetchTodoTaskDone();
    }, []);
    function fetchTodoTask(){
        axios.get("http://127.0.0.1:1000/api/tasks?isFinished=false").then((res)=>{
            console.log(res);
            setTodo(res.data);
        })
    }
    function fetchTodoTaskDone(){
        axios.get("http://127.0.0.1:1000/api/tasks?isFinished=true").then((res)=>{
            console.log(res);
            setDone(res.data);
        })
    }
    function onCreate(){
        //console.log(createInput, createTime);
        axios.post("http://127.0.0.1:1000/api/task", {
            taskName: createInput,
            time: createTime,
            isFinished: false
        }).then(()=>{
            setCreateInput("");
            setCreateTime("");
            fetchTodoTask();
        })
    }
    function onUpdate(id, isFinished){
        axios.put(`http://127.0.0.1:1000/api/tasks?id=${id}`, {
            isFinished: isFinished,
        }).then(()=> {
            fetchTodoTask();
            fetchTodoTaskDone();
        })
    }
    return (
    <div>
    <div>
     <h1>Todo</h1>
     <ul>
        {todo.map((task)=> (
            <li>
                <span>{task.taskName}</span>
                <span>{task.time}</span>
                <button onClick={onUpdate(task._id, true)}>done</button>
            </li>
        ))}
     </ul> 
     <h1>Done</h1>
     <ul>
        {done.map((task)=> (
            <li>
                <span>{task.taskName}</span>
                <span>{task.time}</span>
                <button onClick={onUpdate(task._id, true)}>done</button>
            </li>
        ))}
     </ul> 
    </div>
    <div>
        <h1>Create</h1>
        <input onChange={(e)=> {
            setCreateInput(e.target.value);
        }}/>
        <input type='time' onChange={(e)=> {
            setCreateTime(e.target.value);
        }}/>
        <button onClick={onCreate()}>Create</button>
    </div>
    </div>
    );
}

export default API;