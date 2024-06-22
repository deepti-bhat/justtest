import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, get, query, update, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyARXkfgelSp_BiBTzJSUgKlbIfDGnIbXxo",
    authDomain: "nsproj-952d7.firebaseapp.com",
    databaseURL: "https://nsproj-952d7-default-rtdb.firebaseio.com",
    projectId: "nsproj-952d7",
    storageBucket: "nsproj-952d7.appspot.com",
    messagingSenderId: "538649995856",
    appId: "1:538649995856:web:c809202b6c5a2e899d7f55"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

async function fetch(info) {
    try{
        console.log("reached the function");
    const usersRef = ref(db, 'nsproj'); // Assuming 'users' is the path where user data is stored
    const usersSnapshot = await get(usersRef);
  
    if (usersSnapshot.exists()) {
      usersSnapshot.forEach((userSnapshot) => {
           // Get the user ID
          const userData = userSnapshot.val(); // Get the user data
          console.log(userData.doc);
          console.log(info);
          if (userData && userData.doc == info) {
            console.log(userData.user);
            sessionStorage.setItem("userName", userData.user);
            console.log(userData.pass);
            const userID = userSnapshot.key;
            const path = '/nsproj/'+userID+'/user';
            const databaseRef = ref(db, path);
            onValue(databaseRef, (snapshot) => {
                const data = snapshot.val();
                console.log('Data has changed:', data);
                sessionStorage.setItem("userName", data);
                myFunction(data);
            });
                }
            });
    } else {
        console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
}
// Reference to the specific path/node in your database
fetch("http://bart");
function myFunction(data) {
    if (data !== "null") {
    window.location.href = "nextpage.html";
    }
}


