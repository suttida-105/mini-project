import React, { useState, useEffect } from "react";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Nav from "./Nav";
const Show = (props) => {
  const { confirm } = Modal;
  const [user, setUser] = useState({ id: "", name: "" });
  const AllAction = bindActionCreators(allAction, useDispatch());
  useEffect(() => {
    getlocalStorage();
  }, []);
  const getlocalStorage = async () => {
    let load = localStorage.getItem("user");
    if (load) {
      load = load.split(":");
      setUser({ id: load[0], name: load[1] });

      AllAction.getFirestore(load[0]);
    } else {
      props.history.push("/");
    }
  };
  const data = useSelector((state) => state.dataList);

  const showConfirm = (file, id) => {
    confirm({
      title: "คุณแน่ใจจะลบรูปนี้?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        
        return new Promise( async (resolve, reject) => {
          await AllAction.deleteFile(file, id, user.id);
          await AllAction.getFirestore(user.id)
          setTimeout(Math.random() > 0 ? resolve : reject, 1000);
        })
      },
      onCancel() {},
    });
  };
  function renderImg() {
    if (data.length == 0) return <div>Not Found</div>;
    return data.map((item, i) => {
      return (
        <Col span={6} style={{ padding: 10 }} key={i}>
          <div
            className="bt-close"
            onClick={() => showConfirm(item.namefile, item.id)}
          >
            X
          </div>
          <a href={item.url} target="_blank">
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
          </a>
        </Col>
      );
    });
  }

  return (
    <div className="bg-show-full">
      <Nav page="1"/>
      <div className="">
        <Row gutter={16} style={{ padding: 30 }}>
          {renderImg()}
        </Row>
      </div>
    </div>
  );
};

export default Show;
