
import { Component, Input, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";
import { Internship } from '../models/internship.model';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { RouterModule } from '@angular/router';






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
var email= ''
var password = ''


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internships$: Observable<any[]> | undefined;
  internshipsList: Internship[] = [];

  

  ngOnInit() {
    this.getInternships();
  
  }









  async getInternships() {
    const starCountRef = ref(database, '/internships/internships'); // Assuming '/internships' is the correct path in your database
    onValue(starCountRef, (snapshot) => {
      const internshipsData = snapshot.val();

      if (internshipsData) {
        this.internshipsList = Object.keys(internshipsData).map(key => {
          const internship = internshipsData[key];
           return new Internship(
            internship.title,
            internship.description,
            internship.offered
          );
        });
      }
       console.log("hola",this.internshipsList);
    });
  }
  






  
    @Input() title: string | undefined;
    @Input() description: string | undefined;
    @Input() offered: boolean | undefined;
  }
  
  
  
  
  