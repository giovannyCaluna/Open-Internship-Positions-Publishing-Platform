import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ModalService } from './modal.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private modalService: ModalService) {}

  openAddInternshipModal() {
    const dialogRef = this.modalService.openAddInternshipModal();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
console.log(result);
      }
    });
  }

  title = 'internship-project';
}
