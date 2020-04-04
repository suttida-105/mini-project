import React, { useState, useEffect } from "react";
import firebase from "../firebase";
function Upload() {
  const [file, setFile] = useState({});
  const [data, setData] = useState([]);
  useEffect(()=>{
    getFirestore()
  },[])
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
  function getFirestore(){
    let tmp = [];
    let db = firebase.firestore();
    db.collection("img")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tmp.push(doc.data());
        });
      })
      .finally(() => {
        setData(tmp);
        
      });
  }
  return (
    <div>
      <h1>UPLOAD</h1>
      <input type="file" onChange={e => handleChange(e)} />
      <button onClick={upload}>upload</button>
      <div>
          {data.map(item=>{
              return (
                  <div>
                      <h1>{item.name}</h1>
                      <img src={item.url} height="200px"/>               
                  </div>
              )
          })}
      </div>
    </div>
  );
}
export default Upload;
