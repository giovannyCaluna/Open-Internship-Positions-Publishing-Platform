import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddInternshipModalComponent } from './add-internship-modal/add-internship-modal.component';
import { Internship } from './models/internship.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openAddInternshipModal(): MatDialogRef<AddInternshipModalComponent> {
    return this.dialog.open(AddInternshipModalComponent, {
      width: '400px',
      disableClose: true,
      data:null

    });
  }
  openEditInternshipModal(internship:Internship): MatDialogRef<AddInternshipModalComponent> {
    return this.dialog.open(AddInternshipModalComponent, {
      width: '400px',
      disableClose: true,
      data:internship
      
    });
  }
}
