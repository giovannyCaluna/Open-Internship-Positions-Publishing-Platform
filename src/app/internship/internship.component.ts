
import { Component, Input, OnInit } from '@angular/core';
import { getDatabase } from "firebase/database";
import { ref, onValue } from "firebase/database";
import { Internship } from '../models/internship.model';
import { FirebaseServicesService } from '../firebase-services.service';
import { ModalService } from '../modal.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})



export class InternshipComponent implements OnInit {
  user = new User("", "", "", "");
  internshipsList: Internship[] = [];
  auxInternshipsList: Internship[] = [];
  constructor(private firebaseService: FirebaseServicesService, private modalService: ModalService,  private router: Router) { }
  database = getDatabase(this.firebaseService.getApp());

  async ngOnInit() {
    await this.firebaseService.getUser().then((result) => {
      this.user = result;
      localStorage.setItem('User', JSON.stringify(this.user));
     //this.router.navigate(['/registration']);

      
    });
    console.log("user", this.user);

    this.getInternships(this.user.role);
  }

/**
 * Function to get the internships. We need the role to modify the options in the component
 * @param role 
 */
  async getInternships(role: String) {
    const starCountRef = ref(this.database, '/internships'); // Assuming '/internships' is the correct path in your database
    onValue(starCountRef, (snapshot) => {
      const internshipsData = snapshot.val();
      if (internshipsData) {
        if (role == "student") {
           this.internshipsList = Object.keys(internshipsData).filter(
            (key) => this.verifyApplication(internshipsData[key].applicants, this.user.userId)
          )
            .map(key => {
              const internship = internshipsData[key];
              return new Internship(
                key,
                internship.title,
                internship.description,
                internship.offered,
                internship.owner,
                internship.category,
                internship.applicants
              );
            });
            this.auxInternshipsList = this.internshipsList;
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
              internship.category,
              internship.applicants
            );
          }
          );
          this.auxInternshipsList = this.internshipsList;
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
  openAplicants(internship: any) {
    const dialogRef = this.modalService.openListApplications(internship);
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
    dialogRef.afterClosed().subscribe(result => {
      console.log("The internship opportunity was updated!", result);
    });
  }
  isStudet() {
    return this.user.role == "student" ? true : false;
  }

  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Another Item', 'Yet Another Item'];
  filteredItems: string[] = this.items;

  search(): void {
    this.auxInternshipsList = this.internshipsList.filter((internship) => 
      internship.title.toUpperCase().includes(this.searchTerm.toUpperCase()) 
  );

}
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() offered: boolean | undefined;
 searchTerm: string = '';
}



