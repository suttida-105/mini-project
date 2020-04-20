import React, { useState, useEffect } from 'react';
import firebase from "../firebase";

const Show = () =>{
    const [data, setData] = useState([]);
    useEffect(()=>{
        getFirestore()
    },[])
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
      function renderImg(){
        return data.map(item=>{
            return (
                <div>
                    <h1>{item.name}</h1>
                    <img src={item.url} height="200px"/>               
                </div>
            )
        })
      }
      
    return (
        <div>
            SHOW
            {
              renderImg()  
            }
        </div>
    )
}

export default Show