
import { Component, Input, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";
import { Internship } from '../models/internship.model';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { RouterModule } from '@angular/router';
import { FirebaseServicesService } from '../firebase-services.service';







// Initialize Firebase
//const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const database = getDatabase(app);
// var email= ''
// var password = ''


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internships$: Observable<any[]> | undefined;
  internshipsList: Internship[] = [];

  constructor(private firebaseService: FirebaseServicesService) { }

  database = getDatabase(this.firebaseService.getApp());


  ngOnInit() {
    this.getInternships();

  }

  async getInternships() {


    const starCountRef = ref(this.database, '/internships/internships'); // Assuming '/internships' is the correct path in your database
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
      console.log("hola", this.internshipsList);
    });
  }








  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() offered: boolean | undefined;
}




