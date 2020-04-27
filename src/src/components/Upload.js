import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Nav from "./Nav";
import { Button } from "antd";
function Upload(props) {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({ id: "", name: "" });

  useEffect(() => {
    getlocalStorage();
  }, []);
  function handleChange(e) {
    // ref3
    setFiles(Array.from(e.target.files));
  }
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/upload");
      load = load.split(":");
      setUser({ id: load[0], name: load[1] });
    } else {
      props.history.push("/login");
    }
  };
  async function upload() {
    files.forEach((file) => {
      let fileName = file.name;
      let ts = new Date();
      fileName = ts.getTime() + fileName;

      let storageRef = firebase.storage().ref(fileName);
      storageRef.put(file);
      let url =
        // "https://firebasestorage.googleapis.com/v0/b/mini-project-1f085.appspot.com/o/" +
        "https://firebasestorage.googleapis.com/v0/b/red-cable-227103.appspot.com/o/" +
        fileName +
        "?alt=media";
      console.log({ name: file.name, url: url });
      writeFirestore({ name: file.name, url: url });
    });
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
          <div>
            <input type="file" multiple onChange={(e) => handleChange(e)} />
          </div>
          <div>
            <Button type="primary" onClick={upload}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Upload;
