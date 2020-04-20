import React, { useState } from 'react';
import axios from 'axios'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
const Login = () =>{
    const [form , setForm] = useState({
        username : "",
        password : ""
    })
    const AllAction = bindActionCreators(allAction, useDispatch())
    const login  = async () =>{
        AllAction.login(form)
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