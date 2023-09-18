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
      await this.getUser();
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


        resolve(user2); // Resolve the promise with the user2 object when data is available
      });


    });
  }

  getFinalUser() {

    return this.user;
  }



  validateRole(role: String) {
    this.getUser().then((result) => {
      this.user = result;
    });
    console.log("role send by the function {}user role {}", this.user.role);
    if (role == this.user.role) {
      console.log("El usuario tiene el rol que selecciono");
      return true
    }
    console.log("El usuario No tiene el rol que selecciono");
    return false;

  }
}