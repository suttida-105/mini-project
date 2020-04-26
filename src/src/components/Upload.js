import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Nav from "./Nav";

function Upload(props) {
  const [file, setFile] = useState({});
  const [user , setUser] = useState({id:"",name:""})

  useEffect(() => {
    getlocalStorage();
  }, []);
  function handleChange(e) {
    // setReview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  const getlocalStorage = () => {
    let load = localStorage.getItem("user");
    if (load) {
      props.history.push("/upload");
      load = load.split(":");
      setUser({id:load[0],name:load[1]})
      
    } else {
      props.history.push("/login");
    }
  };
  async function upload() {
    let fileName = file.name;
    let storageRef = firebase.storage().ref(fileName);
    storageRef.put(file);
    let url =
      // "https://firebasestorage.googleapis.com/v0/b/mini-project-1f085.appspot.com/o/" +
      "https://firebasestorage.googleapis.com/v0/b/red-cable-227103.appspot.com/o/"+
      fileName +
      "?alt=media";
    console.log({ name: fileName, url: url });
    writeFirestore({ name: fileName, url: url });
  }
  function writeFirestore(data) {
    console.log(user);
    console.log(user.id.toString());
    
    let db = firebase.firestore();
    db.collection(user.id.toString())
      .doc()
      .set(data)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
  return (
    <div>
      <Nav />

      <h1>UPLOAD</h1>
      <input type="file" onChange={e => handleChange(e)} />
      <button onClick={upload}>upload</button>
    </div>
  );
}
export default Upload;
