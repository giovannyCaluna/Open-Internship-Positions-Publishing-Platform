import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-option-bar',
  templateUrl: './option-bar.component.html',
  styleUrls: ['./option-bar.component.css']
})
export class OptionBarComponent {
  constructor(private firebaseService: FirebaseServicesService, private modalService: ModalService, private router: Router, public auth: AuthService) { }
  singOut() {
    var auth = getAuth(this.firebaseService.getApp());
    auth.signOut();
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  logged() {
    return this.auth.isAuthenticated();
  }
  openAddInternshipModal() {
    const dialogRef = this.modalService.openAddInternshipModal();
    dialogRef.afterClosed().subscribe(result => {
      console.log("The internship opportunity was updated!", result);
    });
  }

  isStudent() {
    var user = JSON.parse(localStorage.getItem('User') || '{}');
    return user.role == "student" ? true : false;
  }


}
