
export class Message {
  sender: string;
  recipient: string;
  content: string;
  createdAt: Date;

  constructor( sender: string, recipient: string, content: string) {
    this.sender = sender;
    this.recipient = recipient;
    this.content = content;
    this.createdAt = new Date();
  }
}