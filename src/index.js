import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import Autenticacion from './autenticacion/autenticacion.js';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyDmK79I6EGqo0V7Sh15xbslHIOvBqGBco4",
    authDomain: "segga-75fb1.firebaseapp.com",
    databaseURL: "https://segga-75fb1.firebaseio.com",
    projectId: "segga-75fb1",
    storageBucket: "segga-75fb1.appspot.com",
    messagingSenderId: "767973470590" 
});

ReactDOM.render(<Autenticacion />, document.getElementById('root'));

serviceWorker.unregister();
