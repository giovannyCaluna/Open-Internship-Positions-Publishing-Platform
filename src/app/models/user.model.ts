export class User {
    userId: string;
    name: string;
    role: string;
    email: string;
    applications:string[]=[];

    constructor(userId: string, name: string, role: string, email: string) {
        this.userId = userId;
        this.name = name;
        this.role = role;
        this.email = email;
    }
}