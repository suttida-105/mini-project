import React, { useState, useEffect } from "react";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Nav from "./Nav";
const Show = (props) => {
  const user = { id: "", name: "" };
  const AllAction = bindActionCreators(allAction, useDispatch());
  useEffect(() => {
    getlocalStorage();
  }, []);
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      load = load.split(":");
      if ((user.id = "")) {
        props.history.push("/");
      } else {
        user.name = load[1];
        user.id = load[0];
        AllAction.getFirestore(user.id);
      }
    } else {
      props.history.push("/");
    }
  };
  const data = useSelector(state => state.dataList);
  
  function renderImg() {  
    if (data.length == 0) return <div>Not Found</div>;
    return data.map((item, i) => {
      return (
        <Col span={6} style={{ padding: 10 }} key={i}>
          <div
            style={{
              backgroundImage: "url(" + item.url + ")",
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundPosition: "center",
              backgroundSize: 500,
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1 className="mark">{item.name}</h1>
          </div>
        </Col>
      );
    });
  }

  return (
    <div>
      <Nav />
      <Row gutter={16} style={{ padding: 30 }}>
        {renderImg()}
      </Row>
    </div>
  );
};

export default Show;
