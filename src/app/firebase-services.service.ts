import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {
  private app: FirebaseApp;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig as FirebaseOptions);
  }

  getApp(): FirebaseApp {
    return this.app;
  }
}