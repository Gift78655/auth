import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAz1lLU25fp5SbCrFO-xSWS2NVGd_wat4o",
    authDomain: "authenticator-b002d.firebaseapp.com",
    projectId: "authenticator-b002d",
    storageBucket: "authenticator-b002d.firebasestorage.app",
    messagingSenderId: "586602192200",
    appId: "1:586602192200:web:960a117f7a57fa2a6d677d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// OAuth Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
