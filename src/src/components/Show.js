import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Nav from "./Nav";
const Show = (props) => {
  const [data, setData] = useState([]);
  const user = { id: "", name: "" };
  const AllAction = bindActionCreators(allAction, useDispatch());
  useEffect(() => {
    getlocalStorage();
    getFirestore();
  }, []);
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/");
      load = load.split(":");
      user.id = load[0];
      user.name = load[1];
    } else {
      props.history.push("/login");
    }
  };
  //ref1
  function getFirestore() {
    let tmp = [];
    let db = firebase.firestore();
    db.collection(user.id.toString())
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tmp.push(doc.data());
        });
      })
      .finally(() => {
        setData(tmp);
      });
  }
  function renderImg() {
    if (data.length == 0) return <div>loadding....</div>;
    return data.map((item,i) => {
      return (
        <Col span={6} style={{ padding: 10 }} key={i}>
          <div
            style={{
              backgroundImage: "url(" + item.url + ")",
              height: 250,
              display: "flex",
              justifyContent: "center",
                alignItems: "center",
                backgroundPosition:"center",
                backgroundSize:500,
                backgroundRepeat:"no-repeat"
            }}
          >
              <h1 className="mark">{item.name}</h1>
            </div>
          {/* <img src={item.url} width="100%" /> */}
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
