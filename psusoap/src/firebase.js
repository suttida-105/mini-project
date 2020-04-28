import firebase from 'firebase' //เพิ่มโมดูล firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvl2GgH8NKAlPrve6EnnjO2NaRtJherh4",
  authDomain: "mini-project-2a9d9.firebaseapp.com",
  databaseURL: "https://mini-project-2a9d9.firebaseio.com",
  projectId: "mini-project-2a9d9",
  storageBucket: "mini-project-2a9d9.appspot.com",
  messagingSenderId: "805877280113",
  appId: "1:805877280113:web:22d7881f722e72656c9ad0",
  measurementId: "G-08KD07BV0F"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase // ส่งfirebase ให้สามารถใช้ในไฟล์อื่นได้