
import { Component, OnInit } from '@angular/core';
import { getAuth , createUserWithEmailAndPassword} from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  constructor(private firebaseService: FirebaseServicesService, private router: Router ) { }
  auth =  getAuth(this.firebaseService.getApp());
  database = getDatabase(this.firebaseService.getApp());

  name: string = '';
  email: string = '';
  role: string = '';
  password: string = '';


  ngOnInit(): void {

   
  

  };





  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password).then(response => 
      {
        console.log(response.user.uid);
        const userRef = ref(this.database,`users/${response.user.uid}`); // Assuming '/internships' is the correct path in your database
        set(userRef,{
          name:this.name,
          role:this.role,
          email:this.email
        })
        this.router.navigate(['/login']); // Replace 'destination-route' with your actual route

     });
  
    console.log('Registration submitted:', this.name, this.email, this.role, this.password);

  }

}