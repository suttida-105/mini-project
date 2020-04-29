import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";
import firebase from "../firebase";

const user = {
  id: "",
  name: "",
};
const dataList = [];
export const allAction = {
  login: (user) => async (dispatch) => {
    if (user.password && user.username) {
      let res = await axios.post(`https://psusoap.herokuapp.com/`, { ...user });
      // let res = await axios.post(`http://localhost/`, { ...user });
      const [id, name, surname] = res.data.GetStudentDetailsResult.string;
      if (id == "" && name == "") {
        alert("ไม่พบบัญชีผู้ใช้");
      } else {
        let save = id + " : " + name + " " + surname;
        localStorage.setItem("user", save);
        dispatch({ type: "LOGIN", id: id, name: name + " " + surname });
      }
    } else {
      alert("กรุณากรอกข้อมูล");
      dispatch({ type: "LOGOUT" });
    }
  },
  logout: () => async (dispatch) => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "DELDATA" });
  },
  //ref1
  getFirestore: (id) => async (dispatch) => {
    let tmp = [];
    let db = firebase.firestore();
    db.collection(id.toString())
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tmp.push({ ...doc.data(), id: doc.id });
        });
      })
      .finally(() => {
        dispatch({ type: "SETDATA", tmp });
      });
  },
  upload: (files, id) => async (dispatch) => {
    files.forEach((v, i) => {
      let fileName = v.name;
      let ts = new Date();
      //ref 5
      fileName = fileName.replace(/\s/g, "");
      fileName = ts.getTime() + fileName;

      let storageRef = firebase.storage().ref(fileName);
      storageRef.put(v);

      let url =
        "https://firebasestorage.googleapis.com/v0/b/mini-project-2a9d9.appspot.com/o/" +
        fileName +
        "?alt=media";
      console.log({ name: v.name, url: url });
      let data = { name: v.name, url: url, namefile: fileName };

      console.log(user);
      console.log(user.id.toString());
      //ref4
      let db = firebase.firestore();
      db.collection(id.toString())
        .doc()
        .set(data)
        .then(function () {
          console.log("Document successfully written!");
          if (i == files.length - 1) alert("อัปโหลดรูปสำเร็จ");
        })
        .catch(function (error) {
          alert("ไม่อัปโหลดรูปสำเร็จ");

          console.error("Error writing document: ", error);
        });
    });
  },
  deleteFile: (file, id, user_id) => async (dispatch) => {
    let db = firebase.firestore();
    db.collection(user_id)
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    var desertRef = firebase.storage().ref(file);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        // File deleted successfully
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  },
};
const loginReducer = (data = user, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...data,
        id: action.id,
        name: action.name,
      };
    case "LOGOUT":
      return {
        ...data,
        id: "",
        name: "",
      };
    default:
      return data;
  }
};
const dataReducer = (data = dataList, action) => {
  switch (action.type) {
    case "SETDATA":
      return [...action.tmp];
    case "DELDATA":
      return [];
    default:
      return data;
  }
};
const rootReducer = combineReducers({
  user: loginReducer,
  dataList: dataReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

export default store;
