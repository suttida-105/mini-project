import React, { useState, useEffect } from 'react';
import firebase from "../firebase";
import { allAction } from "../redux/store";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Nav from './Nav'
const Show = (props) =>{
    const [data, setData] = useState([]);
    const user = {id  : "", name : ""}
    const AllAction = bindActionCreators(allAction, useDispatch());
    useEffect(()=>{
      getlocalStorage()
      getFirestore()
    },[])
    const getlocalStorage = () => {
      let load = localStorage.getItem("user");
      if (load) {
        props.history.push("/show");
        load = load.split(":")
        user.id = load[0]
        user.name = load[1]
      
      } else {
        props.history.push("/login");
      }
    };
    function getFirestore(){
        let tmp = [];
        let db = firebase.firestore();
        db.collection(user.id.toString())
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
        if(data.length == 0) return (<div>Not Found</div>)
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
          <Nav/>
            
            {
              renderImg()  
            }
        </div>
    )
}

export default Show