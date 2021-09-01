import Firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBVSkt7f0xpual5etpYhzg9GlTnpX-Mqs4",
  authDomain: "m-and-s-fashion-store.firebaseapp.com",
  databaseURL: "https://m-and-s-fashion-store.firebaseio.com",
  projectId: "m-and-s-fashion-store",
  storageBucket: "m-and-s-fashion-store.appspot.com",
  messagingSenderId: "840861806078",
  appId: "1:840861806078:web:3379dd2047c6d92f7124af"
};

Firebase.initializeApp(firebaseConfig);

export default Firebase;