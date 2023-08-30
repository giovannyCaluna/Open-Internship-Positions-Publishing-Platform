import { Component, Injectable, Input, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: "AIzaSyBWGb7ST0biDutUWkugWVPWopZ-qEHfhq4",
  authDomain: "open-internships-platform.firebaseapp.com",
  databaseURL: "https://open-internships-platform-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "open-internships-platform",
  storageBucket: "open-internships-platform.appspot.com",
  messagingSenderId: "164250589237",
  appId: "1:164250589237:web:93cfefbc29538a341f797c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
const sign = signInWithEmailAndPassword;
const email ='';
const password ='';


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent implements OnInit {
  @Injectable()
 
 // email: string = '';
  //password: string = '';

   @Input() email: string='';
   @Input() password: string='';




  ngOnInit() {}

  async signInWithEmailPassword(email: string, password: string) {
    try {
      const auth = getAuth(); // Initialize Firebase Auth instance
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

   login( ) {

   // this.email='gio-vanny1@hotmail.com';
    //this.password='123456';
    console.log("hola",this.email, this.password);

    console.log(signInWithEmailAndPassword(auth, this.email,this.password)

      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("userCredential: ", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);
      }

    ));

 
  }

}