import React, { useState, useEffect } from "react";
import axios from "axios";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Input } from "antd";
import "./login.css";
const Login = props => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [active , setActive] = useState(false)
  const AllAction = bindActionCreators(allAction, useDispatch());
  const user = useSelector(state => state.user);
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/show");
    } else {
      props.history.push("/");
    }
  };
  useEffect(() => {
    if (user.id != "") {
      props.history.push("/show");
    }
    getlocalStorage();
  }, []);
  const login = async () => {
    setActive(true)
      await AllAction.login(form);
      props.history.push("/show");
      setActive(false)
    
  };

  return (
    <div className="bg">
      <Row >
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}>
          <div className="flex-input">
            <div>
              <h4>PSU Passport Authentication</h4>
              <Input
                placeholder="PSU Passport Account Name"
                onChange={e => {
                  setForm({ ...form, username: e.target.value });
                }}
                style={{ marginBottom: 5 }}
              />
              <Input
                placeholder="Password"
                type="password"
                onChange={e => {
                  setForm({ ...form, password: e.target.value });
                }}
                style={{ marginBottom: 5 }}
              />

              <div>
                <Button type="primary" onClick={login}>
              { active &&(<i class="fa fa-circle-o-notch fa-spin"/>)}<p style={{marginLeft:10,marginRight:10}}>Login</p>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
