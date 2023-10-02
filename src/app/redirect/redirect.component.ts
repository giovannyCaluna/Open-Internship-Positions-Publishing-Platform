import { Component, OnInit } from '@angular/core';
import {  getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { FirebaseServicesService } from '../firebase-services.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],


  animations: [
    trigger('loadingAnimation', [
      state('loading', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      transition('loading => hidden', animate('300ms')),
      transition('hidden => loading', animate('300ms')),
    ])
  ]

})
export class RedirectComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private firebaseService: FirebaseServicesService, private router: Router) { }
  auth = getAuth(this.firebaseService.getApp());
  database = getDatabase(this.firebaseService.getApp());

  name: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  textInput: string = '';
  items: string[] = [];
  disabled: boolean = false;
  user:User  =JSON.parse(localStorage.getItem('User')||'{}');


  async ngOnInit(): Promise<void> {


      // Simulate a delay (e.g., an HTTP request) and then set isLoading to false to hide the loading animation
      setTimeout(() => {
        this.isLoading = false;
      }, 3000); // Simulated 3-second delay
    

    await this.firebaseService.getUser().then((result) => {
      const auxUser = new User(result.userId, result.name, result.role, result.email)
      console.log("NgOnInit", auxUser);
      if(auxUser.userId!="" ){
        this.router.navigate(['/applyInternships']);
      }else{
        this.router.navigate(['/registration']);


      }


      })};



   disbleInputs(){
   if (this.user.name != "" && this.user.email != "") {
      this.disabled = true;
    }
  }

  
}
