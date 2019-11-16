import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
import { HashRouter , Route, Link } from 'react-router-dom'
import LoginAndSignUp from './LoginAndSignUp'
import PollsView from './PollsView'
import Stats from './Stats'

import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOpXarQGtj3M_LIMJhx3ydMuchSBmuO6M",
    authDomain: "pollsapp-1806f.firebaseapp.com",
    databaseURL: "https://pollsapp-1806f.firebaseio.com",
    projectId: "pollsapp-1806f",
    storageBucket: "",
    messagingSenderId: "869297256104"
  };
  firebase.initializeApp(config);



// const preobj = document.getElementById('object');
// const dbRef = firebase.database().ref().child('object');
//   dbRef.on('value',snap => console.log(snap.val()))

ReactDOM.render(<HashRouter>
    <div>
     <Route exact path="/" component={LoginAndSignUp} />
     <Route exact path="/home" component={App} />
     <Route exact path="/polls" component={PollsView} />
     <Route exact path="/stats" component={Stats} />
    </div>
     </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
