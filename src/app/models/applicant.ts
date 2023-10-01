export class Applicant {
    userId:string;
    name: string;
    email: string;
    message:string;
    constructor( userId:string, name: string, email: string,  message: string) {
        this.userId=userId;
        this.name = name;
        this.email = email;
        this.message=message;
    };
}