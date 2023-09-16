import { Component, Input, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private firebaseService: FirebaseServicesService, private router: Router) { }

  auth = getAuth(this.firebaseService.getApp());


  @Input() email: string = '';
  @Input() password: string = '';
  role: string = '';



  ngOnInit() { }

  async signInWithEmailPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }
  async login() {

      try {
        await this.firebaseService.login(this.email, this.password);
        if(this.role== "student"){
          
          this.router.navigate(['/applyInternships']); // Replace 'destination-route' with your actual route

        }else{
          this.router.navigate(['/postInternships']); // Replace 'destination-route' with your actual route

        }
  
      } catch {
        this.router.navigate(['/login']); // Replace 'destination-route' with your actual route
  
      }
   
   
  }

}