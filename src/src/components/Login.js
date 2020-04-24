import React, { useState, useEffect } from "react";
import axios from "axios";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
const Login = props => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const AllAction = bindActionCreators(allAction, useDispatch());
  const user = useSelector(state => state.user);
  const saveLocalStorage = () => {
    let save = user.id + ":" + user.name;
    localStorage.setItem("user", save);
  };
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/show");
    } else {
      props.history.push("/login");
    }
  };
  useEffect(() => {
    if (user.id != "") {
      props.history.push("/show");
      saveLocalStorage();
    }
    getlocalStorage();
  }, []);
  const login = async () => {
    AllAction.login(form);
    props.history.push("/show");

  };

  return (
    <div>
      INPUT
      <input
        onChange={e => {
          setForm({ ...form, username: e.target.value });
        }}
      />
      <input
        onChange={e => {
          setForm({ ...form, password: e.target.value });
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Login;
