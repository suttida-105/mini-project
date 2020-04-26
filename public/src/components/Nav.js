import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { allAction } from "../redux/store";

const Nav = () => {
  const AllAction = bindActionCreators(allAction, useDispatch());

  const getName = () => {
    return localStorage.getItem("user");
  };
  const logout = () => {
    localStorage.clear();
    AllAction.logout();
    
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/show">My Gallery</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/upload">Upload</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{getName()}</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link onClick={logout} to="/login">logout</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Nav;
