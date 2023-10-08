import { Message } from "./message";

export class Chat {
  id: string;
  name: string;
  participants: string[];
  messages: Message[];

  constructor(name: string, participants: string[], messages: Message[]) {
    this.id = "";
    this.name = name;
    this.participants = participants;
    this.messages = messages;
  }
}