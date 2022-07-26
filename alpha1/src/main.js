import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKru88pbgyD4Nv8Bont-bnBuFpvhEkVKU",
  authDomain: "alpha1-1e868.firebaseapp.com",
  projectId: "alpha1-1e868",
  storageBucket: "alpha1-1e868.appspot.com",
  messagingSenderId: "718759724221",
  appId: "1:718759724221:web:18b0fc4c78da6253f023d4",
  measurementId: "G-THY1T395CP",
};

// Initialize Firebase
initializeApp(firebaseConfig);
require("@/assets/main.scss");
createApp(App).use(router).mount("#app");
