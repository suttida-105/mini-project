import React, { useState } from 'react';
import axios from 'axios'
const Login = () =>{
    const [form , setForm] = useState({
        username : "",
        password : ""
    })
    const [student , setStudent] = useState({
        id : "",
        name : "",
    })
    const login  = async () =>{
        console.log(form);
        let res = await axios.post('http://localhost/',{...form})
        let [ id , name , latename ] = res.data.GetStaffDetailsResult.string
        setStudent({id , name : name+" "+latename})
        
    }
    return (
        <div>
            INPUT
            <input onChange={e=>{setForm({...form,username:e.target.value})}}/>
            <input onChange={e=>{setForm({...form,password:e.target.value})}}/>
            <button onClick={login}>Login</button>
        </div>
    )
}
export default Login