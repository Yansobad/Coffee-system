import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase config
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const inpPhone = document.querySelector(".inp-phone");
const inpUsername = document.querySelector(".inp-username");
const inpEmail = document.querySelector(".inp-email");
const inpPwd = document.querySelector(".inp-pwd");
const inpConfirmPwd = document.querySelector(".inp-cf-pw");
const registerForm = document.querySelector("#register-form");

// Handle form submission
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const Username = inpUsername.value.trim();
  const email = inpEmail.value.trim();
  const password = inpPwd.value;
  const confirmPassword = inpConfirmPwd.value;
  const phoneNumber = inpPhone.value.trim();

  if (!Username || !email || !password || !confirmPassword) {
    alert("Vui lòng điền đủ các trường");
    return;
  }
  if(phoneNumber == "") {
    alert("Vui lòng nhập số điện thoại");
    return;
  }
  if (phoneNumber.length < 10 ) {
    alert("Số điện thoại không hợp lệ");
    return;
  }
  if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
    alert("Số điện thoại chỉ chứa chữ số");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  try {
    // Đăng ký người dùng
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, Username, phoneNumber);
    const user = userCredential.user;

    // Cập nhật tên hiển thị
    await updateProfile(user, { displayName: Username });

    // Gửi email xác minh
    await sendEmailVerification(user);



    // Lưu vào Firestore
    await setDoc(doc(db, "users", user.uid), {
      Username,
      email,
      role_id: 2, // quyền mặc định
      balance: 0,
      createdAt: serverTimestamp()
    });

    // Lưu vào localStorage
    const session = {
      user: {
        uid: user.uid,
        email: user.email,
        fullName: Username,
        phoneNumber: phoneNumber,
      },
      expiry: new Date().getTime() + 2 * 60 * 60 * 1000
    };
    localStorage.setItem("user_session", JSON.stringify(session));

    alert("Đăng ký thành công. Vui lòng kiểm tra email để xác minh.");
    window.location.href = "./index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email đã được sử dụng. Vui lòng chọn email khác.");
    } else {
      alert(`Lỗi: ${error.message}`);
      console.error("Đăng ký lỗi:", error);
    }
  }
});
