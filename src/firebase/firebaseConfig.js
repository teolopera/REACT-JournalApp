import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDy5MPBcRpI2eXsVxMKfl6kReCND77mYxc",
    authDomain: "react-app-curso-f88c9.firebaseapp.com",
    databaseURL: "https://react-app-curso-f88c9.firebaseio.com",
    projectId: "react-app-curso-f88c9",
    storageBucket: "react-app-curso-f88c9.appspot.com",
    messagingSenderId: "786473248232",
    appId: "1:786473248232:web:b4dda3ccf85a2123df705d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }