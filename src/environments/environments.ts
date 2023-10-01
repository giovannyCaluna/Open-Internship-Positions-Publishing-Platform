import { EmailAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";


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
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            return true;
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/applyInternships',
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,

    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};





