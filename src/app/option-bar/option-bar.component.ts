import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-option-bar',
  templateUrl: './option-bar.component.html',
  styleUrls: ['./option-bar.component.css']
})
export class OptionBarComponent {
  constructor(private firebaseService: FirebaseServicesService, private router: Router, public auth: AuthService) { }

  singOut() {
    var auth = getAuth(this.firebaseService.getApp());
    auth.signOut();
    this.router.navigate(['/login']); // Replace 'destination-route' with your actual route
  }
  logged() {
    console.log("Chaking the ngIf", this.auth.isAuthenticated());
    return this.auth.isAuthenticated();
  }

}
