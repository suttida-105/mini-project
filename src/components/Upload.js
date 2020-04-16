import React, { useState } from "react";
import firebase from "../firebase";
function Upload() {
  const [file, setFile] = useState({});
 
  function handleChange(e) {
    // setReview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  async function upload() {
    let fileName = file.name;
    let storageRef = firebase.storage().ref(fileName);
    storageRef.put(file);
    let url =
      "https://firebasestorage.googleapis.com/v0/b/mini-project-1f085.appspot.com/o/" +
      fileName +
      "?alt=media";
    console.log({ name: fileName, url: url });
    writeFirestore({ name: fileName, url: url }) 

  }
  function writeFirestore(data) {
    let db = firebase.firestore();
    db.collection("img")
      .doc("C")
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
      <h1>UPLOAD</h1>
      <input type="file" onChange={e => handleChange(e)} />
      <button onClick={upload}>upload</button>
    </div>
  );
}
export default Upload;
