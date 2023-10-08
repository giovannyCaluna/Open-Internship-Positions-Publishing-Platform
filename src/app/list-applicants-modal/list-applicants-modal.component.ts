import { Component } from '@angular/core';
import { FirebaseServicesService } from '../firebase-services.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { getDatabase, push, ref } from 'firebase/database';
import { Applicant } from '../models/applicant';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Component({
  selector: 'app-list-applicants-modal',
  templateUrl: './list-applicants-modal.component.html',
  styleUrls: ['./list-applicants-modal.component.css']
})
export class ListApplicantsModalComponent {
  constructor(private firebaseService: FirebaseServicesService, private dialogRef: MatDialogRef<any>) { }
  user = new User("", "", "", "");
  database = getDatabase(this.firebaseService.getApp());
  description: string = '';
  title: string = '';
  offered: string = '';
  key: string = '';
  applicants: [] = [];
  listApplicants: Applicant[] = [];
  sendmessage: Boolean = false;
  messageFromtheCompany: string = "";

  async ngOnInit() {
    await this.firebaseService.getUser().then((result) => { this.user = result; });
    if (this.dialogRef._containerInstance._config.data != null) {
      this.description = this.dialogRef._containerInstance._config.data.description;
      this.title = this.dialogRef._containerInstance._config.data.title;
      this.offered = this.dialogRef._containerInstance._config.data.offered;
      this.key = this.dialogRef._containerInstance._config.data.key;
      this.applicants = this.dialogRef._containerInstance._config.data.applicants;

    }
    this.listApplicants = Object.keys(this.applicants).map((key: any) => {
      const auxUser: Applicant = this.applicants[key];
      return new Applicant(auxUser.userId, auxUser.name, auxUser.email, auxUser.message);
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }


  showMessageInput() {
    this.sendmessage = true;
  }

   sendMessage(applicant: Applicant) {
    var messageFromCompany: Message[] = [];
    messageFromCompany.push(new Message(this.user.name, applicant.name, this.messageFromtheCompany));
    
    var chatCompany: Chat = new Chat(applicant.name, [this.user.userId, applicant.userId], messageFromCompany);
    var chatApplicant: Chat = new Chat(this.user.name, [this.user.userId, applicant.userId], messageFromCompany);

    const starCountRefCompany = ref(this.database, '/users/' + this.user.userId + '/chats');
    const starCountRefApplicant = ref(this.database, '/users/' + applicant.userId + '/chats');

    try {
      push(starCountRefCompany, chatCompany);
      push(starCountRefApplicant, chatApplicant);
      this.dialogRef.close();
    } catch (error) {
      console.log("error", error);
    }
  }
  cancelContact() {
    this.sendmessage = false;
    this.messageFromtheCompany = "";
  }

}
