import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';
import { UserCredential, getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { getDatabase, onValue, ref } from "firebase/database";
import { User } from './models/user.model';
import { ContentObserver } from '@angular/cdk/observers';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {
  user:User= new User("","","",""); 
  private app: FirebaseApp;
  user$!: Observable<UserCredential>;

 

  constructor() {
    this.app = initializeApp(environment.firebaseConfig as FirebaseOptions);

  }

  getApp(): FirebaseApp {
    return this.app;
  }

async login(email:string,password:string){
  var auth =   getAuth(this.getApp());
  try{
    console.log('User signed in successfully');

   await signInWithEmailAndPassword(auth, email, password).then(result =>
    
      this.user.userId = result.user.uid);

  }catch (error){
    console.error('Sign in error:', error);

  }

}

 async getUser(){
   var database =  getDatabase(this.getApp());
   const starCountRef = ref(database, 'users/'+ this.user.userId); // Assuming '/internships' is the correct path in your database
   await onValue(starCountRef, (snapshot) => {
   
     const userData = snapshot.val();
     console.log(userData);
     this.user.mail=userData.mail;
     this.user.name=userData.name;
     this.user.role=userData.role;


   
 });
 console.log(this.user);

  return this.user;
}





  
}