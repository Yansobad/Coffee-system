const balanceForm = document.querySelector('#balance-form');
const inpAmount = document.querySelector('#amount');
const cardType = document.querySelector('#card-type');
const bankLogo = document.querySelector('#bank-logo');
const balanceNumber = document.querySelector('.balance-number');
const cardCredit = document.querySelector('#card-credit');

const userEmail = userSession.user.email; // Phải có sẵn từ đăng nhập Firebase

// Định dạng số tiền Việt Nam
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

cardCredit.addEventListener('blur', function () {  // Sự kiện khi người dùng rời khỏi input
    const cardNumber = cardCredit.value.trim();  // Lấy giá trị số thẻ và loại bỏ khoảng trắng

    // Kiểm tra độ dài số thẻ
    if (cardNumber.length < 16 || cardNumber.length > 19 || cardNumber === "") {
        alert("Số thẻ không hợp lệ! Vui lòng kiểm tra lại"); // Hiển thị cảnh báo
        cardCredit.value = "";  // Xóa giá trị số thẻ
        return;
    }
});



// Hàm hiển thị logo ngân hàng
function displayBankLogo(bank) {
  const logos = {
    vietcombank: "./vietcombank.jpg",
techcombank: "./techcombank.jpg",
bidv: "./bidv.webp",
vietinbank: "./vietinbank.jpg",
acb: "./acb.jpg",
vpbank: "./vpbank.jpg",
mbbank: "./mbbank.jpg",
sacombank: "./sacombank.jpg",
shinhan: "./shinhan.jpg"
  };

  if (logos[bank]) {
    bankLogo.innerHTML = `<img src="${logos[bank]}" alt="${bank} logo" width="200px">`;
  } else {
    bankLogo.innerHTML = '';
  }
}

// Lấy số dư ví người dùng
function loadUserBalance() {
  db.collection("users").where("email", "==", userEmail)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const balance = data.balance || 0;
        balanceNumber.textContent = formatVND(balance);
      });
    })
    .catch(error => {
      console.error("Lỗi khi lấy số dư:", error);
      balanceNumber.textContent = "Không thể tải";
    });
}

// Gọi khi vừa load trang
loadUserBalance();

// Lắng nghe sự kiện chọn ngân hàng
cardType.addEventListener('change', function() {
  const selectedBank = cardType.value;
  displayBankLogo(selectedBank);
});

// Xử lý khi người dùng nạp tiền
balanceForm.addEventListener('submit', e => {
  e.preventDefault();
  const amount = parseFloat(inpAmount.value);
  const cardNumber = cardCredit.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Vui lòng nhập số tiền hợp lệ!");
    return;
  }

  if (!cardNumber) {
    alert("Vui lòng nhập số thẻ tín dụng!");
    return;
  }

  db.collection("users").where("email", "==", userEmail)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const oldBalance = doc.data().balance || 0;
        const newBalance = oldBalance + amount;

        db.collection("users").doc(doc.id).update({ balance: newBalance })
  .then(() => {
    // Đảm bảo chỉ gọi alert một lần
    alert("Nạp tiền thành công!");
    inpAmount.value = ''; // reset số tiền
    cardCredit.value = ''; // reset thẻ tín dụng
    loadUserBalance(); // Cập nhật lại giao diện (lấy lại số dư mới)
  })
  .catch((error) => {
    console.error("Lỗi khi cập nhật số dư: ", error);
    alert("Có lỗi xảy ra khi nạp tiền, vui lòng thử lại.");
  });
      });
    })
    .catch(error => {
      console.error("Lỗi khi tìm người dùng:", error);
    });
});

