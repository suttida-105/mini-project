import React, { useState, useEffect } from "react";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { Button, Col, Row } from "antd";
import img_upload from "../img/26640.png";
function Upload(props) {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({ id: "", name: "" });
  const [url_review, setUrlreview] = useState([]);
  const AllAction = bindActionCreators(allAction, useDispatch());
  const [active, setActive] = useState(false);
  useEffect(() => {
    getlocalStorage();
  }, []);
  function handleChange(e) {
    // ref3
    setFiles(Array.from(e.target.files));
    let arrReview = [];
    let allfiles = Array.from(e.target.files);
    allfiles.forEach((element) => {
      arrReview.push(URL.createObjectURL(element));
    });
    setUrlreview(arrReview);
    console.log(arrReview);
  }
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/upload");
      load = load.split(":");
      setUser({ id: load[0], name: load[1] });
    } else {
      props.history.push("/");
    }
  };
  const clear = () => {
    setUrlreview("");
    setFiles({});
  };
  async function upload() {
    if (files.length == 0 || url_review.length == 0) {
      alert("กรูณาเลือกไฟล์ก่อน");
    } else {
      setActive(true);
      await AllAction.upload(files, user.id);
      clear();
      setActive(false);
    }
  }
  const removeInUpload = (index) => {
    let newFiles = files.filter((v, i) => {
      return i != index;
    });
    let newUrlreview = url_review.filter((v, i) => {
      return i != index;
    });
    setFiles(newFiles);
    setUrlreview(newUrlreview);
  };
  const renderReview = () => {
    return url_review.map((v, i) => {
      return (
        <Col key={i}>
          <div className="bt-close" onClick={() => removeInUpload(i)}>
            X
          </div>
          <img src={v} height="200px" />;
        </Col>
      );
    });
  };
  return (
    <div className="bg-upload">
      <Nav page="2" />
      <div style={{ padding: 30, textAlign: "center" }}>
        <h1>UPLOAD</h1>
        <div>
          {url_review.length != 0 && <Row>{renderReview()}</Row>}
          {url_review.length == 0 && (
            <div>
              <div class="image-upload">
                <label for="file-input">
                  <img src={img_upload} className="img-upload" />
                </label>

                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          )}

          <div style={{ padding: 10 }}>
            <Button type="primary" onClick={upload}>
              {active && <i class="fa fa-circle-o-notch fa-spin" />}
              <p style={{ marginLeft: 10, marginRight: 10 }}> Upload</p>
            </Button>{" "}
            <Button type="primary" onClick={clear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Upload;
