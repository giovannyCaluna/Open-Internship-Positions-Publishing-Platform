import {  Component, Input, OnInit } from '@angular/core';
import { getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { Router } from '@angular/router';


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  
export class LoginComponent implements OnInit {

  constructor(private firebaseService: FirebaseServicesService,  private router: Router ) { }

  auth =  getAuth(this.firebaseService.getApp());


   @Input() email: string='';
   @Input() password: string='';


  ngOnInit() {}


  async signInWithEmailPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

   login( ) {

    console.log(signInWithEmailAndPassword(this.auth, this.email,this.password)

      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("userCredential: ", user);
        this.router.navigate(['/']); // Replace 'destination-route' with your actual route

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);
      }

    ));

 
  }

}