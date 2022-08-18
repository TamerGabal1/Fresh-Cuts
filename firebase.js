import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getDatabase, //get our database from firebase
  ref, //gives a specific reference in our database
  push, //creates a new location in a given reference
  set, //adds data to the database
  onValue, //reads data from the database
  get
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsLhGBee6Gu3UJj0J1e-XUTPhdRRG0PJ8",
  authDomain: "fresh-cuts-359422.firebaseapp.com",
  projectId: "fresh-cuts-359422",
  storageBucket: "fresh-cuts-359422.appspot.com",
  messagingSenderId: "490072403395",
  appId: "1:490072403395:web:6227945a4caf2c90ca2176"
};

const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database, ref, push, set, onValue, get };
