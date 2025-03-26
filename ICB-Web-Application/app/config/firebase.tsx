// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { Firestore, getFirestore, doc, setDoc, collection, addDoc, getDoc, where, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import {child, getDatabase, ref, set, get, query, orderByChild, equalTo} from "firebase/database";
import Game from "../Game";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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
const storage = getStorage(app);

//user password and email
var curremail = "";
var currpassword = "";

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
            TrainerMessages: []
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
        curremail = email;
        currpassword = password;
        router.push('/HomePage');
    }
    catch(e){
        console.log("Error: ", e);
    }
}

export async function updateProfilePic(image: Blob){
    try{
        const user = auth.currentUser;
        console.log("User: ", image);
        if(user){
            const metadata = {
                contentType: 'image/jpeg'
            };
            const imageRef = storageRef(storage, `profile_pics/${user.uid}`);
            await uploadBytesResumable(imageRef, image, metadata);
            const imageUrl = await getDownloadURL(imageRef);
            await updateProfile(user, { photoURL: imageUrl });
        }
    }
    catch(e){
        console.log("Error: ", e);
    }
}

export async function getUserPhoto( uid: string = "NULL"){
    try{
        if(uid === "NULL"){
            uid = await auth.currentUser?.uid || "NULL";
        }
            const imageRef = storageRef(storage, `profile_pics/${uid}`);
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
    }
    catch(e){
        console.log("Error: ", e);
        return null;
    }
}

export async function getGames(uid: string = "NULL"){
    uid = await auth.currentUser?.uid || "NULL";
    if (uid === "NULL") {
        console.log("No user found");
        return null;
    }
    try{
        const snapshot = await get(child(ref(database), 'users/' + uid + '/Games'));
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

export async function getCurrentGame() {
    try{
        const snapshot = await get(child(ref(database), 'Board1 Current Game'));
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
    //get current user Id
    if(uid === "NULL"){
        uid = await auth.currentUser?.uid || "NULL";
    }
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

export async function getUIDFromEmail(email: string, password: string) {
    try {
        // Temporarily sign in with the provided email and password
        const tempUser = await signInWithEmailAndPassword(auth, email, password);
        const uid = tempUser.user.uid;

        // Sign out the temporary user
        await auth.signOut();

        // Sign back in with the current user
        await signInWithEmailAndPassword(auth, curremail, currpassword);

        return uid;
    } catch (e) {
        console.log("Error: ", e);
        return null;
    }
  }

  export async function getUID(){
    try{
        const user = auth.currentUser;
        console.log("User: ", user);
        if(user){
            return user.uid;
        }
    }
    catch(e){
        console.log("Error: ", e);
    }
  }

export async function StartGame(gameMode: string, timer: number, extra_time:number, assistance: string, oppUID: string){
    //create a new game
    const docref = collection(db, "Board1 Current Game");
   
    const uid = await auth.currentUser?.uid;
    console.log("Game Started");
    router.push('/CurrentGame');
    var OtherId = oppUID=="NULL"? "I0l6aEpAoXhUiAMeHVqmiEZrtcG3": oppUID;

    //set variables for the game
    //start game
    set(ref(database, 'Board1 Current Game/Start_Game'), true);

    //setGame mode
    set(ref(database, 'Board1 Current Game/Gamemode'), gameMode);

    //set Assistance
    set(ref(database, 'Board1 Current Game/Assistance'), assistance);

    //set Timer
    set(ref(database, 'Board1 Current Game/Timer'), timer);

    //set Extra Time
    set(ref(database, 'Board1 Current Game/Extra_Time'), extra_time);

    // Randomly assign the player to be either white or black
    const isWhite = Math.random() < 0.5;
    if (isWhite) {
        set(ref(database, 'Board1 Current Game/White_Player_ID'), uid);
        set(ref(database, 'Board1 Current Game/Black_Player_ID'), OtherId);
    }
    else{
        set(ref(database, 'Board1 Current Game/Black_Player_ID'), uid);
        set(ref(database, 'Board1 Current Game/White_Player_ID'), OtherId);
    }

    // Initialize trainer messages array
    set(ref(database, 'Board1 Current Game/TrainerMessages'), []);
}

export async function Resign(side: string){
    const uid = await auth.currentUser?.uid;
    if(side === "White"){
        set(ref(database, 'Board1 Current Game/White_Resign'), true);
    }
    else{
        set(ref(database, 'Board1 Current Game/Black_Resign'), true);
    }

}

export async function Draw(side: string){
    const uid = await auth.currentUser?.uid;
    if(side === "White"){
        set(ref(database, 'Board1 Current Game/White_Draw'), true);
    }
    else{
        set(ref(database, 'Board1 Current Game/Black_Draw'), true);
    }

}

export async function endGame(){
    //end the game
    set(ref(database, 'Board1 Current Game/Start_Game'), false);
}

// Add a function to update trainer messages
export async function updateTrainerMessage(gameNumber: number, moveIndex: number, message: string) {
    const uid = await auth.currentUser?.uid;
    if (!uid) {
        console.log("No user found");
        return;
    }
    try {
        const gamePath = `users/${uid}/Games/Game${gameNumber}/TrainerMessages`;
        const snapshot = await get(child(ref(database), gamePath));
        let messages = [];
        if (snapshot.exists()) {
            messages = snapshot.val();
        }
        messages[moveIndex] = message;
        await set(ref(database, gamePath), messages);
    } catch (error) {
        console.error("Error updating trainer message:", error);
    }
}

export async function getUsername(uid: string = "NULL"): Promise<string | null> {
     //get current user Id
     if (uid === "NULL") {
        uid = await auth.currentUser?.uid || "NULL";  
     }
    try {
        const snapshot = await get(child(ref(database), 'users/' + uid));
        if (snapshot.exists()) {
            return snapshot.val().Username; //return the username
        } else {
            console.log("No such document");
            return null;
        }
    } catch (e) {
        console.log("Error: ", e);
        return null;
    }
}

export async function timerPressBlack(){
    const docref = collection(db, "Board1 Current Game");
    const snapshot = await get(child(ref(database), 'Board1 Current Game/Black_Timer_Button'));
    if(snapshot.exists()){
        set(ref(database, 'Board1 Current Game/Black_Timer_Button'), true);
    }
    else{
        set(ref(database, 'Board1 Current Game/Black_Timer_Button'), false);
    }

} 

export async function timerPressWhite(){
    const docref = collection(db, "Board1 Current Game");
    const snapshot = await get(child(ref(database), 'Board1 Current Game/White_Timer_Button'));
    if(snapshot.exists()){
        set(ref(database, 'Board1 Current Game/White_Timer_Button'), true);
    }
    else{
        set(ref(database, 'Board1 Current Game/White_Timer_Button'), false);
    }
}