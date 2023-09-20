import { Component, OnInit } from '@angular/core';
import { FirebaseServicesService } from '../firebase-services.service';
import { getDatabase, update } from 'firebase/database';
import { ref, push } from "firebase/database";
import { Internship } from '../models/internship.model'
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { Applicant } from '../models/applicant';


@Component({
  selector: 'app-apply-internship-modal',
  templateUrl: './apply-internship-modal.component.html',
  styleUrls: ['./apply-internship-modal.component.css']
})
export class ApplyInternshipModalComponent  implements OnInit  {
  constructor(private firebaseService: FirebaseServicesService, private dialogRef: MatDialogRef<any>) { }
  user = new User("","","","");
  owner: User = new User('', '', '', '');
  database = getDatabase(this.firebaseService.getApp());
  message:string='';


 async ngOnInit() {
   await this.firebaseService.getUser().then((result) => {
     this.user = new User(result.userId, result.name, result.role, result.email)
   });
   if (this.dialogRef._containerInstance._config.data != null) {
     this.description = this.dialogRef._containerInstance._config.data.description;
     this.title = this.dialogRef._containerInstance._config.data.title;
     this.offered = this.dialogRef._containerInstance._config.data.offered;
     this.key = this.dialogRef._containerInstance._config.data.key;
   }
 }

 async applyInternship() {
   if (this.dialogRef._containerInstance._config.data != null) {
     var newApplicant = new Applicant(this.user.userId, this.user.name, this.user.email, this.message);
     const starCountRef = ref(this.database, '/internships/' + this.key+'/applicants');
     console.log(push(starCountRef,  newApplicant), newApplicant);
   }
  //  } else {
     
  //    var newInternship = new Internship('', this.title, this.description, this.offered, this.user, this.category);
  //    console.log("saving new register", newInternship);
  //    const starCountRef = ref(this.database, '/internships/'); // Assuming '/internships' is the correct path in your database
  //    console.log(push(starCountRef, newInternship));
  //  }

   this.dialogRef.close();
 }

 description: string = '';
 title: string = '';
 offered: string = '';
 key: string = '';
 category: string = '';
 onSaveClick() {

 }
 onCancelClick() {
   this.dialogRef.close();

 }
}
