import React, { useState, useEffect } from "react";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { Button } from "antd";
function Upload(props) {
  const [files, setFiles] = useState({});
  const [user, setUser] = useState({ id: "", name: "" });
  const [url_review, setUrlreview] = useState("");
  const AllAction = bindActionCreators(allAction, useDispatch());


  useEffect(() => {
    getlocalStorage();
  }, []);
  function handleChange(e) {
    // ref3
    setFiles(e.target.files[0]);
    setUrlreview(URL.createObjectURL(e.target.files[0]));
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
  const clear = () =>{
    setUrlreview("")
    setFiles({})
  }
  async function upload() {
    await AllAction.upload(files,user.id)
    clear()
  }
  return (
    <div>
      <Nav />
      <div style={{ padding: 30, textAlign: "center" }}>
        <h1>UPLOAD</h1>
        <div>
          {url_review != "" && (
            <div>
              <img src={url_review} height="500px" />
            </div>
          )}
          {url_review == "" && (
            <div>
              <input type="file" multiple onChange={(e) => handleChange(e)} />
            </div>
          )}

          <div style={{padding:10}}>
            <Button type="primary" onClick={upload}>
              Upload
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
