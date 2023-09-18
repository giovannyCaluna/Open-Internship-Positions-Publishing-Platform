import { User } from './user.model';
export class Internship {
  key: string;
  title: string;
  description: string;
  offered: string;
  category: String;
  owner: User;
  applicants: User[]=[];

  constructor(key: string, title: string, description: string, offered: string, owner: User, category: string) {
    this.key = key;
    this.title = title;
    this.description = description;
    this.offered = offered;
    this.category = category;
    this.owner = owner;
  }
}