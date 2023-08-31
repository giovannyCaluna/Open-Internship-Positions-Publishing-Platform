import { Component, OnInit } from '@angular/core';
import { FirebaseServicesService } from '../firebase-services.service';
import { getDatabase, update } from 'firebase/database';
import { ref, onValue, push } from "firebase/database";
import { Internship } from '../models/internship.model'
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.model';


@Component({
  selector: 'app-add-internship-modal',
  templateUrl: './add-internship-modal.component.html',
  styleUrls: ['./add-internship-modal.component.css']
})
export class AddInternshipModalComponent implements OnInit {

  constructor(private firebaseService: FirebaseServicesService, private dialogRef: MatDialogRef<any>) { }


  ngOnInit(): void {
    if (this.dialogRef._containerInstance._config.data != null) {
      console.log(this.dialogRef._containerInstance._config.data);
      this.description = this.dialogRef._containerInstance._config.data.description;
      this.title = this.dialogRef._containerInstance._config.data.title;
      this.offered = this.dialogRef._containerInstance._config.data.offered;
      this.key = this.dialogRef._containerInstance._config.data.key;
    }
  }


  database = getDatabase(this.firebaseService.getApp());

  async saveInternship() {
    if (this.dialogRef._containerInstance._config.data != null) {
      var newInternship = new Internship(this.key, this.title, this.description, this.offered, this.owner,this.category);
      const starCountRef = ref(this.database, '/internships/internships/' + this.key);

      await console.log(update(starCountRef, newInternship));


    } else {

      var newInternship = new Internship('', this.title, this.description, this.offered, this.owner,this.category);
      const starCountRef = ref(this.database, '/internships/internships'); // Assuming '/internships' is the correct path in your database
      await console.log(push(starCountRef, newInternship));
    }

    this.dialogRef.close();


  }


  description: string = '';
  title: string = '';
  offered: string = '';
  key: string = '';
  owner: User = new User('', '', '', '');
  category: string = '';

  onSaveClick() {

  }
  onCancelClick() {
    this.dialogRef.close();

  }
}
