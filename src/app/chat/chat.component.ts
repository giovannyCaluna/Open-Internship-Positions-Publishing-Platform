import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { FirebaseServicesService } from '../firebase-services.service';
import { User } from '../models/user.model';
import { getDatabase, onValue, ref, update, get } from 'firebase/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  replyMessage: string = "";
  selectedChat: Chat = new Chat("", [], []);
  chats: Chat[] = [];
  user = new User("", "", "", "");
  chatsReceiver: Chat[] = [];

  database = getDatabase(this.firebaseService.getApp());
  constructor(private firebaseService: FirebaseServicesService) { }
  async ngOnInit() {
    await this.firebaseService.getUser().then((result) => { this.user = result; });
    this.getChats();
  }

  getChats() {
    try {
      this.chats = Object.keys(this.user.chats).map((key: any) => {
        var chat = this.user.chats[key];
        chat.id = key;
        return chat;
      });
    } catch (e) {
      console.log("error", e);
    }
    return [];
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    const starCountRef = ref(this.database, '/users/' + this.user.userId + '/chats/' + chat.id + '/messages/');
    onValue(starCountRef, (snapshot) => { this.selectedChat.messages = snapshot.val(); });
  }



  sendMessage() {
    this.selectedChat.messages.push(
      new Message(this.user.name, this.selectChat.name, this.replyMessage)
    );
    this.selectedChat.participants.forEach((participant) => {
      if (participant != this.user.userId) {
        this.getChatsFromReceiverUser(participant, new Message(this.user.name, this.selectChat.name, this.replyMessage));
      } else {
        const starCountRef = ref(this.database, '/users/' + participant + '/chats/' + this.selectedChat.id);
        update(starCountRef, this.selectedChat);
      }
    });
  }

  getChatsFromReceiverUser(idUser: string, message: Message) {
    const starCountRef = ref(this.database, '/users/' + idUser + '/chats/');
    get(starCountRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.chatsReceiver = snapshot.val();
        Object.keys(this.chatsReceiver).filter((key: any) => {
          var chat = this.chatsReceiver[key];
          if (chat.participants.includes(this.user.userId)) {
            chat.messages.push(message);
            const starCountRef = ref(this.database, '/users/' + idUser + '/chats/' + key);
            update(starCountRef, chat);
          }
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
