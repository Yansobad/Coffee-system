// <!-- Firebase App + Auth + Firestore -->

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const clientInfoDiv = document.getElementById('client-info');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      clientInfoDiv.innerHTML = `
        <p><strong>Họ tên:</strong> ${userData.Username || 'Không có tên'}</p>
        
      `;
    } else {
      clientInfoDiv.innerHTML = `<p>Không tìm thấy thông tin người dùng trong Firestore.</p>`;
    }
  } else {
    clientInfoDiv.innerHTML = `<p>Chưa đăng nhập.</p>`;
  }
});
