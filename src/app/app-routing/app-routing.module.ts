import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { InternshipComponent } from '../internship/internship.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthGuard } from '../auth.guard';
import { ApplicationComponent } from '../application/application.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'applyInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  // { path: 'postInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  { path: 'applyInternships', component: InternshipComponent },
  { path: 'postInternships', component: InternshipComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'applications', component: ApplicationComponent } 
];
console.log([AuthGuard]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
