import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyB0E56nxObbbXdrf-TTotqbdWB9SPxsZ2k",
    authDomain: "venderino-27386.firebaseapp.com",
    databaseURL: "https://venderino-27386.firebaseio.com",
    projectId: "venderino-27386",
    storageBucket: "venderino-27386.appspot.com",
    messagingSenderId: "303986002783",
    appId: "1:303986002783:web:45275d9f52db37bed844ea",
    measurementId: "G-RZQT5S9PDL"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
