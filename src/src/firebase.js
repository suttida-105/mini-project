import firebase from 'firebase' //เพิ่มโมดูล firebase
var firebaseConfig = {
    // apiKey: "AIzaSyD9tZXwxYLKr16GoZxXL61qST6MbEIQ14Q",
    // authDomain: "mini-project-1f085.firebaseapp.com",
    // databaseURL: "https://mini-project-1f085.firebaseio.com",
    // projectId: "mini-project-1f085",
    // storageBucket: "mini-project-1f085.appspot.com",
    // messagingSenderId: "8118581832",
    // appId: "1:8118581832:web:60c61db17a959649f8f67d",
    // measurementId: "G-CSJHZYBDTG"

    apiKey: "AIzaSyBlD4-yvugxb4nRfFisp6C2wvgD2NiIPeg",
    authDomain: "red-cable-227103.firebaseapp.com",
    databaseURL: "https://red-cable-227103.firebaseio.com",
    projectId: "red-cable-227103",
    storageBucket: "red-cable-227103.appspot.com",
    messagingSenderId: "1040783571962",
    appId: "1:1040783571962:web:fb47fe25702e22a2ce0243"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase // ส่งfirebase ให้สามารถใช้ในไฟล์อื่นได้