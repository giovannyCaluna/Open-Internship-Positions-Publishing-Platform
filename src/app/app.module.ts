import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module'; // Import the AppRoutingModule
import { RouterModule } from '@angular/router'; // Import RouterModule


import { AppComponent } from './app.component';
import { InternshipComponent } from './internship/internship.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component'; 
import { initializeApp, FirebaseOptions  } from 'firebase/app';
import { environment } from 'src/environments/environments';
import { FirebaseServicesService } from './firebase-services.service';




@NgModule({
  declarations: [
    AppComponent,
    InternshipComponent, 
    LoginComponent, RegistrationComponent
  ],
  imports: [
    BrowserModule,FormsModule, AppRoutingModule,RouterModule
  ],
  providers:[FirebaseServicesService

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
