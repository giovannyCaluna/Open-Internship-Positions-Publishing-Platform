import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(private modalService: ModalService, private auth: AuthService) { }
  showInternship: boolean = false;
  ngOnInit(): void {


    if (this.auth.isAuthenticated()) {
      this.showInternship = true;
    }
  }


  openAddInternshipModal() {
    const dialogRef = this.modalService.openAddInternshipModal();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  title = 'internship-project';
  logged() {
    //console.log("Chaking the ngIf", this.auth.isAuthenticated());

    return this.auth.isAuthenticated();
  }
}
