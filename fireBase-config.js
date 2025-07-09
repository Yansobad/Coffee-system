// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfj8AZgFR_sCXU92dbA94qLosn8Au5Oc0",
    authDomain: "coffee-management-5c0a0.firebaseapp.com",
    projectId: "coffee-management-5c0a0",
    storageBucket: "coffee-management-5c0a0.appspot.com",
    messagingSenderId: "29355541928",
    appId: "1:29355541928:web:e29709c05e5cb220d2899d",
    measurementId: "G-ET3P65MTQ4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();