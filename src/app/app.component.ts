import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private auth: AuthService) { }
  showInternship: boolean = false;
  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      this.showInternship = true;
    }
  }

  title = 'internship-project';
  logged() {
    return this.auth.isAuthenticated();
  }
}
