import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module'; // Import the AppRoutingModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { InternshipComponent } from './internship/internship.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { FirebaseServicesService } from './firebase-services.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddInternshipModalComponent } from './add-internship-modal/add-internship-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OptionBarComponent } from './option-bar/option-bar.component';
import { ApplyInternshipModalComponent } from './apply-internship-modal/apply-internship-modal.component'
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ApplicationComponent } from './application/application.component';
import { ListApplicantsModalComponent } from './list-applicants-modal/list-applicants-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InternshipComponent,
    LoginComponent, RegistrationComponent, AddInternshipModalComponent, OptionBarComponent, ApplyInternshipModalComponent, ApplicationComponent, ListApplicantsModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, MatButtonModule, AppRoutingModule, RouterModule,
    MatFormFieldModule, BrowserAnimationsModule, MatDialogModule, MatInputModule, MatMenuModule, MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [FirebaseServicesService

  ],
  schemas: [

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
