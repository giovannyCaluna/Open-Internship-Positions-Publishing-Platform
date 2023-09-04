import { CanActivate , CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate():boolean {
    // Check if the user is authenticated.
    if (this.auth.isAuthenticated()) {
      return true;
    }

    // Redirect the user to the login page if they are not authenticated.
    console.log("we should go to login");
    this.router.navigate(['/login']);
    return false;
  }

}