import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddInternshipModalComponent } from './add-internship-modal/add-internship-modal.component';
import { Internship } from './models/internship.model';
import { ApplyInternshipModalComponent } from './apply-internship-modal/apply-internship-modal.component';
import { ListApplicantsModalComponent } from './list-applicants-modal/list-applicants-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openAddInternshipModal(): MatDialogRef<AddInternshipModalComponent> {
    return this.dialog.open(AddInternshipModalComponent, {
      width: '70%',
      disableClose: true,
      data:null

    });
  }
  openEditInternshipModal(internship:Internship): MatDialogRef<AddInternshipModalComponent> {
    return this.dialog.open(AddInternshipModalComponent, {
      width: '70%',
      disableClose: true,
      data:internship
      
    });
  }
  openApplyInternshipModal(internship:Internship): MatDialogRef<ApplyInternshipModalComponent> {
    return this.dialog.open(ApplyInternshipModalComponent, {
      width: '70%',
      disableClose: true,
      data:internship
      
    });
  }

  openListApplications(internship:Internship): MatDialogRef<ListApplicantsModalComponent> {
    return this.dialog.open(ListApplicantsModalComponent, {
      width: '70%',
      disableClose: true,
      data:internship
      
    });
  }
}
