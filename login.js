const inpEmail = document.querySelector(".inp-email");
const inpPwd = document.querySelector(".inp-pwd");
const loginForm = document.querySelector("#login-form");

let userSession = JSON.parse(localStorage.getItem('user_session'));
const now = new Date().getTime();

loginForm.addEventListener("submit", handleLogin); // Đảm bảo sự kiện được đăng ký

function handleLogin(event) {
    event.preventDefault(); // Ngăn chặn form gửi lại

    let email = inpEmail.value.trim();
    let password = inpPwd.value;

    if (!email || !password) {
        alert("Vui lòng điền đủ các trường");
        return;
    }

    // Đăng nhập với Firebase Auth
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            alert("Đăng nhập thành công");

            // Tạo phiên mới và lưu
            const newSession = {
                user: {
                    uid: user.uid,
                    email: user.email,
                },
                expiry: new Date().getTime() + 2 * 60 * 60 * 1000 // 2 tiếng
            };

            localStorage.setItem('user_session', JSON.stringify(newSession));

            // Chuyển tới trang chủ
            window.location.href = "./index.html";
        })
        .catch((error) => {
            alert("Mật khẩu hoặc email không đúng");
            console.error(error); // Debug
        });
}

