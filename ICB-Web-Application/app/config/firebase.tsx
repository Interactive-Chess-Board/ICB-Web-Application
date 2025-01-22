// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { Firestore, getFirestore, doc, setDoc, collection, addDoc, getDoc, } from "firebase/firestore";
import { router } from "expo-router";
import {child, getDatabase, ref, set, get} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBCpj6rfq5H0ThQsL4JLFKFDXCRLe8oeEE",
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
const database = getDatabase(app);

export async function HandleSignUp(email: string, password: string, username: string) {
    try{
        // Register the user password and email
        await createUserWithEmailAndPassword(auth, email, password);
        //get the user id
        let Useruid = auth.currentUser?.uid;
        //register the username of the user in the database
        const docref = collection(db, "users");
        // await addDoc(docref, {UID: Useruid, Username: username});
        setDoc(doc(docref, Useruid), {UID: Useruid, Username: username});
        console.log("Sign In Pressed");

        //real time database user Registration
        set(ref(database, 'users/' + Useruid), {
            Username: username,
            Email: email,
            Elo: 500,
            GamesPlayed: 0,
        });

        //add game collection with Game 0 being the default game
        set(ref(database, 'users/' + Useruid + '/Games' + '/Game0'), {
            BlackElo: 0,
            Moves: "",
            Result: 0,
            White: true,
            White_Elo: 0,
        });

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

export async function getGames(uid: string = "NULL"){
    uid = await auth.currentUser?.uid || "NULL";
    if (uid === "NULL") {
        console.log("No user found");
        return null;
    }
    try{
        const snapshot = await get(child(ref(database), 'users/' + uid + '/Games' + '/Game1' + '/Moves'));
        if (snapshot.exists()) {
            return snapshot.val(); //return the username
        } else {
            console.log("No such document");
            return null;
        }
        
    }
    catch(e){
        console.log("Error: ", e);
    }
}

//get the user data from the database
export async function getUserData(uid: string = "NULL") {
    uid = await auth.currentUser?.uid || "NULL";
    if (uid === "NULL") {
        console.log("No user found");
        return null;
    }
    try {
        const snapshot = await get(child(ref(database), 'users/' + uid));
        if (snapshot.exists()) {
            return snapshot.val(); //return the username
        } else {
            console.log("No such document");
            return null;
        }
    } catch (e) {
        console.log("Error: ", e);
        return null;
    }
}
