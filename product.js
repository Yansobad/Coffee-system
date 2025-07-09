// Tăng số lượng
document.querySelectorAll('.btn-increase').forEach(button => {
    button.addEventListener('click', function () {
        const priceBtn = this.closest('.card-body').querySelector('.price-btn');
        let qty = parseInt(priceBtn.dataset.qty) || 0;
        qty += 1;
        let price = parseInt(priceBtn.dataset.price) || 0;
        priceBtn.dataset.qty = qty;
        priceBtn.innerHTML = `Tổng: ${price * qty * 1000}đ (x${qty})`;
    });
});

// Giảm số lượng
document.querySelectorAll('.btn-decrease').forEach(button => {
    button.addEventListener('click', function () {
        const priceBtn = this.closest('.card-body').querySelector('.price-btn');
        let qty = parseInt(priceBtn.dataset.qty) || 0;
        qty -= 1;
        if (qty < 0) qty = 0;
        let price = parseInt(priceBtn.dataset.price) || 0;
        priceBtn.dataset.qty = qty;
        priceBtn.innerHTML = `Tổng: ${price * qty * 1000}đ (x${qty})`;
    });
});

// Khi click nút "Tổng: ...", lưu vào localStorage
document.querySelectorAll('.go-to-pay').forEach(button => {
    button.addEventListener('click', function (e) {
        const priceBtn = this;
        const qty = parseInt(priceBtn.dataset.qty) || 0;
        const price = parseInt(priceBtn.dataset.price) || 0;

        if (qty <= 0) {
            e.preventDefault();
            alert('Vui lòng chọn ít nhất 1 sản phẩm!');
            return;
        }

        const card = this.closest('.card');
        const name = card.querySelector('.card-title').textContent.trim();
        const imageUrl = card.querySelector('img').getAttribute('src');
        const total = price * qty;

        // Thêm id cho sản phẩm nếu có (nếu chưa có thì tạo tạm bằng tên)
        const id = card.dataset.id || name;

        const newItem = {
            id,
            name,
            imageUrl,
            price,
            qty,
            total
        };

        // Lấy giỏ hàng hiện tại
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa dựa trên id (đảm bảo duy nhất)
        let existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            // Nếu có thì cộng dồn số lượng và cập nhật tổng tiền
            existingItem.qty += qty;
            existingItem.total = existingItem.qty * existingItem.price;
        } else {
            // Nếu chưa có thì thêm mới
            cartItems.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert(`Đã thêm ${qty} sản phẩm "${name}" vào giỏ hàng.`);
        // Có thể chuyển trang hoặc update UI sau khi thêm giỏ hàng
    });
});
