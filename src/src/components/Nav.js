import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { allAction } from "../redux/store";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Nav = (props) => {
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
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[props.page]}>
            <Menu.Item key="1">
              <Link to="/show">My Gallery</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/upload">Upload</Link>
            </Menu.Item>
            <Menu.Item key="" style={{backgroundColor:"#1890FF", color:"white"}}>{getName()}</Menu.Item>
            <Menu.Item key="3">
              <Link onClick={logout} to="/">
                logout
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
      
    </div>
  );
};

export default Nav;
