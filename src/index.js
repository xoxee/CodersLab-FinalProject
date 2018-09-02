import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
require("firebase/firestore");

const API_KEY = "AIzaSyAU-kkuF_rBhbsXRK4APWu2OtANdY-PzoE";
const PROJECT_ID = "multirolo-8b586";

var config = {
  apiKey: `${API_KEY}`,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  projectId: PROJECT_ID
};

firebase.initializeApp(config);



ReactDOM.render(<App />, document.getElementById('root'));

