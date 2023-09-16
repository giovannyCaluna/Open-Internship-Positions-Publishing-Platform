import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, onValue, ref } from "firebase/database";
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {
  user: User = new User("", "", "", "");
  private app: FirebaseApp;
  user$!: Observable<UserCredential>;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig as FirebaseOptions);

  }

  getApp(): FirebaseApp {
    return this.app;
  }

  async login(email: string, password: string) {
    var auth = getAuth(this.getApp());
    try {
      console.log('User signed in successfully');
      await signInWithEmailAndPassword(auth, email, password).then(result =>
        this.user.userId = result.user.uid);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  async getUser() {
    return new Promise<User>((resolve) => {
      var database = getDatabase(this.getApp());
      const starCountRef = ref(database, 'users/' + this.user.userId);
  
      onValue(starCountRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("Que ha pasado", userData.role);
        const user2 = new User(
          this.user.userId,
          userData.name,
          userData.role,
          userData.email
        );
        // user2.mail = userData.email;
        // user2.name = userData.name;
        // user2.role = userData.role;
        
        resolve(user2); // Resolve the promise with the user2 object when data is available
      });
  
   
    });
  }
  
  // You can use the getUser function like this:
  // async function someFunction() {
  //   try {
  //     const user = await getUser();
  //     console.log(user);
  //     // Now you can work with the 'user' object here
  //   } catch (error) {
  //     console.error("Error retrieving user data:", error);
  //   }
  // }
  
  getFinalUser() {
    this.getUser();
    return this.user;
  }
}