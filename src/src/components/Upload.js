import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Nav from "./Nav";
import { Button } from "antd";
function Upload(props) {
  const [files, setFiles] = useState({});
  const [user, setUser] = useState({ id: "", name: "" });
  const [url_review, setUrlreview] = useState("");

  useEffect(() => {
    getlocalStorage();
  }, []);
  function handleChange(e) {
    // ref3
    setFiles(e.target.files[0]);
    console.log(e.target.files[0]);

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
    // files.forEach((file) => {
      let fileName = files.name;
      let ts = new Date();
      //ref 5
      fileName = fileName.replace(/\s/g, "");
      fileName = ts.getTime() + fileName;

      let storageRef = firebase.storage().ref(fileName);
      storageRef.put(files);
      let url =
        "https://firebasestorage.googleapis.com/v0/b/mini-project-1f085.appspot.com/o/" +
        fileName +
        "?alt=media";
      console.log({ name: files.name, url: url });
      writeFirestore({ name: files.name, url: url });
    // });
  }
  //ref4
  function writeFirestore(data) {
    console.log(user);
    console.log(user.id.toString());

    let db = firebase.firestore();
    db.collection(user.id.toString())
      .doc()
      .set(data)
      .then(function () {
        console.log("Document successfully written!");
        alert("อัปโหลดรูปสำเร็จ");
        clear()
      })
      .catch(function (error) {
        alert("ไม่อัปโหลดรูปสำเร็จ");

        console.error("Error writing document: ", error);
      });
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
