import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { InternshipComponent } from '../internship/internship.component';
import { PostInternshipComponent } from '../post-internship/post-internship.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'applyInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  { path: 'postInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
];
console.log([AuthGuard]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
