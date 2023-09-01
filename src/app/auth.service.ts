import { Inject, Injectable } from '@angular/core';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseServicesService } from './firebase-services.service';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(private firebaseService:FirebaseServicesService) {}

    


    isAuthenticated() {
        var auth =  getAuth(this.firebaseService.getApp());
        return auth.currentUser !== null;
      }
  
  }