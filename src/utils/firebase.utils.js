import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcEY7TazmMMwCHh16vYT9QWiXkObKSjGo",
    authDomain: "crwn-clothing-db-37d3d.firebaseapp.com",
    projectId: "crwn-clothing-db-37d3d",
    storageBucket: "crwn-clothing-db-37d3d.appspot.com",
    messagingSenderId: "45474230803",
    appId: "1:45474230803:web:f2a5e79a5168cf5f7785e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
