export class User {
    userId: string;
    name: string;
    role: string;
    mail: string;

    constructor(userId: string, name: string, role: string, mail: string) {
        this.userId = userId;
        this.name = name;
        this.role = role;
        this.mail = mail;
    }
}