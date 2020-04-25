import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

const Show = (props) =>{
    const [data, setData] = useState([]);
    const AllAction = bindActionCreators(allAction, useDispatch());
    useEffect(()=>{
        getFirestore()
    },[])
    const logout = ()=>{
        localStorage.clear()
        AllAction.logout()
      props.history.push("/login");

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
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Show