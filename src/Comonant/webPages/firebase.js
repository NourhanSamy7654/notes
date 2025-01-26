import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCsWOAvhKRgvDn1_JqvbShKrri9DWGatMU",
  authDomain: "notes-dfd72.firebaseapp.com",
  projectId: "notes-dfd72",
  storageBucket: "notes-dfd72.appspot.com",
  messagingSenderId: "492759731840",
  appId: "1:492759731840:web:your_app_id_here",
};

 
const app = initializeApp(firebaseConfig);

export default app;
