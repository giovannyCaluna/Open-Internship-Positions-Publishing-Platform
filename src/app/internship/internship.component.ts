
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";
import { Internship } from '../models/internship.model';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { RouterModule } from '@angular/router';
import { FirebaseServicesService } from '../firebase-services.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../modal.service';




@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {

  internships$: Observable<any[]> | undefined;
  internshipsList: Internship[] = [];

  constructor(private firebaseService: FirebaseServicesService, private modalService: ModalService) { }
  ngOnInit(): void {
    this.getInternships();
    console.log(this.firebaseService.getUser());
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       // User is signed in
  //       // You can store the user information or perform actions
  //     } else {
  //       // User is signed out
  //     }
  //   });
  }



  database = getDatabase(this.firebaseService.getApp());
  // user = this.firebaseService.getApp()




  async getInternships() {


    const starCountRef = ref(this.database, '/internships/internships'); // Assuming '/internships' is the correct path in your database
    onValue(starCountRef, (snapshot) => {
      const internshipsData = snapshot.val();

      if (internshipsData) {
        this.internshipsList = Object.keys(internshipsData).map(key => {
          const internship = internshipsData[key];
          return new Internship(
            key,
            internship.title,
            internship.description,
            internship.offered,
            internship.owner,
            internship.category

          );
        });
      }
      console.log("hola", this.internshipsList);
    });
  }




  edit(internship: any) {
    console.log(internship);

    const dialogRef = this.modalService.openEditInternshipModal(internship);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });


  }




  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() offered: boolean | undefined;
}



