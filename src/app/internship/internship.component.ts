
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";
import { Internship } from '../models/internship.model';
import { FirebaseServicesService } from '../firebase-services.service';
import { ModalService } from '../modal.service';
import { User } from '../models/user.model';
import { Applicant } from '../models/applicant';


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  user = new User("", "", "", "");
  internshipsList: Internship[] = [];
  constructor(private firebaseService: FirebaseServicesService, private modalService: ModalService) { }
  database = getDatabase(this.firebaseService.getApp());
  async ngOnInit() {
    await this.firebaseService.getUser().then((result) => {
      this.user = new User(result.userId, result.name, result.role, result.email)
    });
    this.getInternships(this.user.role);
  }

/**
 * Function to get the internships. We need the role to modify the options in the component
 * @param role 
 */
  getInternships(role: String) {
    const starCountRef = ref(this.database, '/internships'); // Assuming '/internships' is the correct path in your database
    onValue(starCountRef, (snapshot) => {
      const internshipsData = snapshot.val();

      if (internshipsData) {
        if (role == "student") {
          this.internshipsList = Object.keys(internshipsData).filter(
            (key) => this.verifyApplication(internshipsData[key].applicants, this.user.userId)
          )
            .map(key => {
              console.log("pasantias q pasaron el filtro", internshipsData)
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

        } else {

          this.internshipsList = Object.keys(internshipsData).filter(key => internshipsData[key].owner.userId == this.user.userId
          ).map(key => {
            const internship = internshipsData[key];
            return new Internship(
              key,
              internship.title,
              internship.description,
              internship.offered,
              internship.owner,
              internship.category

            );
          }
          );
        }

      }
    });
  }

  /**
   * Function to validate if the user apply for the internship
   */

  verifyApplication(applicants: any, userId: string): boolean {
    try {
      var listAppl = Object.keys(applicants).filter(key => applicants[key].userId == userId);
      console.log("Found the elemts", listAppl)
      if (listAppl.length == 0) {return true;} else {return false;}
    }catch (error) {
      return true;
    }

  }
  /**
   * Funciton to Edit an internship
   * @param internship 
   */

  edit(internship: any) {
    const dialogRef = this.modalService.openEditInternshipModal(internship);
    dialogRef.afterClosed().subscribe(result => {
      console.log("The internship opportunity was updated!", result);
    });
  }

  /**
   * Function to appy an internship
   * @param internship 
   */
  apply(internship: any) {
    const dialogRef = this.modalService.openApplyInternshipModal(internship);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("The internship opportunity was updated!", result);
    // });
    console.log("Implemetn the apply procedure.")
  }

  isStudet() {
    return this.user.role == "student" ? true : false;
  }
  openAddInternshipModal() {
    const dialogRef = this.modalService.openAddInternshipModal();
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



