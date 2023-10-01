import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';
import { Auth, UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, onValue, ref } from "firebase/database";
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {
  user: User = new User("", "", "", "");
  private app: FirebaseApp;
  auth: Auth;
  user$!: Observable<UserCredential>;
  constructor() {
    this.app = initializeApp(environment.firebaseConfig as FirebaseOptions);
    this.auth = getAuth(this.app);
  }

  getApp(): FirebaseApp {
    return this.app;
  }

  async login(email: string, password: string) {

    try {
      console.log('User signed in successfully');
      await signInWithEmailAndPassword(this.auth, email, password).then(result => {
        this.user.userId = result.user.uid;
        localStorage.setItem('useruid', result.user.uid);
      }
      );
      await this.getUser();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  async getUser() {
    console.log("getUSer", this.user.userId);
    console.log("getUSer auth", this.auth);
    if (this.user.userId == "") {
      this.user.userId = localStorage.getItem('useruid') || '';
    }
    return new Promise<User>((resolve) => {
      var database = getDatabase(this.getApp());
      const starCountRef = ref(database, 'users/' + this.user.userId);
      onValue(starCountRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("getUSer", userData.role);
        const user2 = new User(
          this.user.userId,
          userData.name,
          userData.role,
          userData.email
        );
        resolve(user2); // Resolve the promise with the user2 object when data is available
      });

    });
  }
  getFinalUser() {
    return this.user;
  }

}