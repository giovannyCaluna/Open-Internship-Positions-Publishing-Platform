import { Component } from '@angular/core';
import { FirebaseServicesService } from '../firebase-services.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { getDatabase, push, ref } from 'firebase/database';
import { Applicant } from '../models/applicant';

@Component({
  selector: 'app-list-applicants-modal',
  templateUrl: './list-applicants-modal.component.html',
  styleUrls: ['./list-applicants-modal.component.css']
})
export class ListApplicantsModalComponent {
  constructor(private firebaseService: FirebaseServicesService, private dialogRef: MatDialogRef<any>) { }
  user = new User("", "", "", "");
  owner: User = new User('', '', '', '');
  database = getDatabase(this.firebaseService.getApp());
  message: string = '';
  async ngOnInit() {
    await this.firebaseService.getUser().then((result) => {
      this.user = new User(result.userId, result.name, result.role, result.email)
    });
    if (this.dialogRef._containerInstance._config.data != null) {
      this.description = this.dialogRef._containerInstance._config.data.description;
      this.title = this.dialogRef._containerInstance._config.data.title;
      this.offered = this.dialogRef._containerInstance._config.data.offered;
      this.key = this.dialogRef._containerInstance._config.data.key;
      this.applicants = this.dialogRef._containerInstance._config.data.applicants;

    }
    console.log("dataos usuario to save internship", this.applicants);
    this.listApplicants = Object.keys(this.applicants).map((key: any) => {
      const auxUser: Applicant = this.applicants[key];
      return new Applicant(auxUser.userId, auxUser.name, auxUser.email, auxUser.message);

    });
  }








  async applyInternship() {
    if (this.dialogRef._containerInstance._config.data != null) {
      var newApplicant = new Applicant(this.user.userId, this.user.name, this.user.email, this.message);
      const starCountRef = ref(this.database, '/internships/' + this.key + '/applicants');
      console.log(push(starCountRef, newApplicant), newApplicant);
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
  applicants: [] = [];
  listApplicants: Applicant[] = [];
  onSaveClick() {

  }
  onCancelClick() {
    this.dialogRef.close();

  }
}
