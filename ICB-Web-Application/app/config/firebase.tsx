// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { Firestore, getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { router } from "expo-router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "NO KEY STEALING",
  authDomain: "icb-capstone.firebaseapp.com",
  projectId: "icb-capstone",
  storageBucket: "icb-capstone.firebasestorage.app",
  messagingSenderId: "174368358822",
  appId: "1:174368358822:web:0421815557c94963cccf67",
  measurementId: "G-MEEJN6BW6W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export async function HandleSignIn(email: string, password: string, username: string) {
    try{
        // Register the user password and email
        await createUserWithEmailAndPassword(auth, email, password);
        //get the user id
        let Useruid = auth.currentUser?.uid;
        //register the username of the user in the database
        const docref = collection(db, "users");
        await addDoc(docref, {UID: Useruid, Username: username});
        console.log("Sign In Pressed");
        //redirect to the welcome page
        router.push('/SignUpPage2');
    }
    catch(e){
        console.log("Error: ", e);
    }
}

export async function HandleLogin(email: string, password: string) {
    try{
        const resonse  = await signInWithEmailAndPassword(auth, email, password);
        router.push('/HomePage');
    }
    catch(e){
        console.log("Error: ", e);
    }
}

export async function updateProfilePic(image: string){
    try{
        const user = auth.currentUser;
        if(user){
            await updateProfile(user, {photoURL: image});
        }
    }
    catch(e){
        console.log("Error: ", e);
    }
}

export async function getUserPhoto(){
    try{
        const user = auth.currentUser;
        if(user){
            return user.photoURL;
        }
        else{
            console.log("No user found");
        }
    }
    catch(e){
        console.log("Error: ", e);
    }
}