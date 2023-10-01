import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirebaseServicesService } from './firebase-services.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseService: FirebaseServicesService) { }
  public isAuthenticatedVar = false;
  isAuthenticated() {
    var auth = getAuth(this.firebaseService.getApp());
    this.isAuthenticatedVar = true;
    return auth.currentUser !== null;
  }

}