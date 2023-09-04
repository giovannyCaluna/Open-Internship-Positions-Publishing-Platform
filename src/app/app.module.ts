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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddInternshipModalComponent } from './add-internship-modal/add-internship-modal.component';
import { MatDialogModule  } from '@angular/material/dialog';
import{MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { OptionBarComponent } from './option-bar/option-bar.component'





@NgModule({
  declarations: [
    AppComponent,
    InternshipComponent, 
    LoginComponent, RegistrationComponent, AddInternshipModalComponent, OptionBarComponent
  ],
  imports: [
    BrowserModule,FormsModule, MatButtonModule, AppRoutingModule,RouterModule, 
    MatFormFieldModule, BrowserAnimationsModule, MatDialogModule, MatInputModule
  ],
  providers:[FirebaseServicesService

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
