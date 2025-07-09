// Hàm hiển thị menu người dùng
window.addEventListener("DOMContentLoaded", () => {
  renderUserMenu(); // Hiển thị thông tin người dùng đã đăng nhập

  function renderUserMenu() {
    const session = JSON.parse(localStorage.getItem("user_session"));
    const now = new Date().getTime();

    if (session && session.expiry > now) {
      const nguoiDung = session.user.fullName || "Người dùng";  // Sử dụng username từ session
      const email = session.user.email || "Không rõ email";      // Sử dụng email từ session

      const menu = document.getElementById("author-menu-drd");
      if (menu) {
        menu.innerHTML = `
          <li><strong>${nguoiDung}</strong></li>  <!-- Hiển thị username -->
          <li>${email}</li>
          <li><a class="dropdown-item" href="./wallet.html">Ví</a></li>
          <li><a class="dropdown-item" href="#" id="logout-btn">Đăng xuất</a></li>
        `;

        document.getElementById("logout-btn").addEventListener("click", () => {
          localStorage.removeItem("user_session");
          window.location.reload();
        });
      }
    } else {
      // Nếu session hết hạn hoặc không tồn tại, có thể chuyển hướng đến trang login
      window.location.href = "./login.html";
    }
  }
});
