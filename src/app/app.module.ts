import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module'; // Import the AppRoutingModule
import { RouterModule } from '@angular/router'; // Import RouterModule


import { AppComponent } from './app.component';
import { InternshipComponent } from './internship/internship.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    InternshipComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,FormsModule, AppRoutingModule,RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
