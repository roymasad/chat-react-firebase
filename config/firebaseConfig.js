
import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/auth";
import 'firebase/storage';
import { getStorage, ref, put } from 'firebase/storage';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  };

const FireApp = firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//firebase.database().setPersistence(firebase.database.Persistence.LOCAL);
