import { Router } from '@angular/router';
import { EmailAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { User } from 'src/app/models/user.model';
import { getDatabase, ref, set } from 'firebase/database';
import { FirebaseServicesService } from 'src/app/firebase-services.service';



export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBWGb7ST0biDutUWkugWVPWopZ-qEHfhq4",
        authDomain: "open-internships-platform.firebaseapp.com",
        databaseURL: "https://open-internships-platform-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "open-internships-platform",
        storageBucket: "open-internships-platform.appspot.com",
        messagingSenderId: "164250589237",
        appId: "1:164250589237:web:93cfefbc29538a341f797c"
    }
};

export const uiConfig = {


    callbacks: {

        signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
            console.log("authResult", authResult);
            console.log("redirectUrl", redirectUrl);
            if ((authResult.user.uid != null)) {
                localStorage.setItem('useruid', authResult.user.uid);
                localStorage.setItem('User',  JSON.stringify(new User(authResult.user.uid,authResult.user.displayName,"",authResult.user.email)));
               window.location.href = 'redirect';

            }
            return false;





        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    queryParameterForSignInSuccessUrl: '/applyInternships',
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,

    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};




