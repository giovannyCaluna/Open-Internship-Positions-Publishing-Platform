import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { InternshipComponent } from '../internship/internship.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthGuard } from '../auth.guard';
import { ApplicationComponent } from '../application/application.component';
import { RedirectComponent } from '../redirect/redirect.component';
import { ChatComponent } from '../chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'applyInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  // { path: 'postInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  { path: 'applyInternships', component: InternshipComponent, canActivate: [AuthGuard]  },
  { path: 'postInternships', component: InternshipComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'applications', component: ApplicationComponent, canActivate: [AuthGuard]  }, 
  { path: 'redirect', component: RedirectComponent } ,
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]  } 
];
console.log([AuthGuard]);


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
