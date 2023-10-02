
import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseServicesService } from '../firebase-services.service';
import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
import { User } from '../models/user.model';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private firebaseService: FirebaseServicesService, private router: Router) { }
  auth = getAuth(this.firebaseService.getApp());
  database = getDatabase(this.firebaseService.getApp());
  isRegister:boolean=false;
  name: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  textInput: string = '';
  items: string[] = [];
  disabled: boolean = false;
  user:User  =JSON.parse(localStorage.getItem('User')||'{}');


  async ngOnInit(): Promise<void> {
    // await this.firebaseService.getUser().then((result) => {
    //   const auxUser = new User(result.userId, result.name, result.role, result.email)
    //   console.log("NgOnInit", auxUser);
    //   if(auxUser.userId!="" ){
    //     this.router.navigate(['/applyInternships']);
    //   }
      
        this.disbleInputs();
        this.name = this.user.name;
        this.email= this.user.email;
      

      };



   disbleInputs(){
   if (this.user.name != "" && this.user.email != "") {
      this.disabled = true;
    }
  }

  register() {
    if(!this.disabled){
      createUserWithEmailAndPassword(this.auth, this.email, this.password).then(response => {
        console.log(response.user.uid);
        const userRef = ref(this.database, `users/${response.user.uid}`); // Assuming '/internships' is the correct path in your database
        set(userRef, {
          name: this.name,
          role: this.role,
          email: this.email,
          interests: this.items
        })
        this.isRegister=true ;

        setTimeout(() => {
          this.router.navigate(['/login']); // Replace 'destination-route' with your actual route

        }, 3000); // Simulated 3-second delay
      });

    }else{
      const userRef = ref(this.database, `users/${this.user.userId}`); // Assuming '/internships' is the correct path in your database
      set(userRef, {
        name: this.name,
        role: this.role,
        email: this.email,
        interests: this.items
      })

      this.isRegister=true ;

      setTimeout(() => {
        this.router.navigate(['/login']); // Replace 'destination-route' with your actual route

      }, 3000); // Simulated 3-second delay


    }

    console.log('Registration submitted:', this.name, this.email, this.role, this.password);
  }


  addItem(): void {
    if (this.textInput.trim() !== '') {
      this.items.push(this.textInput.trim());
      this.textInput = '';
    }
  }

  onEnterPressed(): void {
    // If the event variable is defined, prevent the default form submission behavior
    if (event !== undefined) {
      event.preventDefault();
    }
  
    // Call addItem() to add the item to the list
    this.addItem();
  }

  removeItem(item: string) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }


}