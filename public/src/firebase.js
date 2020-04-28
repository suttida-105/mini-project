import firebase from 'firebase' //เพิ่มโมดูล firebase
var firebaseConfig = {
    apiKey: "AIzaSyD9tZXwxYLKr16GoZxXL61qST6MbEIQ14Q",
    authDomain: "mini-project-1f085.firebaseapp.com",
    databaseURL: "https://mini-project-1f085.firebaseio.com",
    projectId: "mini-project-1f085",
    storageBucket: "mini-project-1f085.appspot.com",
    messagingSenderId: "8118581832",
    appId: "1:8118581832:web:60c61db17a959649f8f67d",
    measurementId: "G-CSJHZYBDTG"

    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase // ส่งfirebase ให้สามารถใช้ในไฟล์อื่นได้