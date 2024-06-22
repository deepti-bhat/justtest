import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, get, query, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

const result = document.getElementById("result");

async function fetch() {
    try{
  
    const usersRef = ref(db, 'nsproj'); // Assuming 'users' is the path where user data is stored
    const usersSnapshot = await get(usersRef);
  
    if (usersSnapshot.exists()) {
      usersSnapshot.forEach((userSnapshot) => {
          const userID = userSnapshot.key; // Get the user ID
          const userData = userSnapshot.val(); // Get the user data
          if (userData && userData.doc == result.textContent) {
              console.log(`User ID: ${userID}, Email: ${userData.doc}`);
              const nodePath = `nsproj/${userID}`;
              const newData = {
              doc: result.textContent,
              user: document.getElementById("name").textContent,
              pass: document.getElementById("password").textContent
          };
          update(ref(db, nodePath), newData)
              .then(() => {
                  console.log("Attribute updated successfully!");
                  fetch();
              })
              .catch((error) => {
                  console.error("Error updating attribute:", error);
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
  
while(true){
    if (result.textContent !== null) {
        fetch();
        break;
    }
}



