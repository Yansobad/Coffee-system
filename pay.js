document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');
    const totalPrice = document.getElementById('total-price');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <img src="./empty-cart.png" alt="Giỏ hàng trống" class="img-fluid mx-auto d-block" style="width:30rem;">
            <p style="font-size:1.5rem; text-align:center;">Chưa có gì trong giỏ hàng hết nè 😢😢😢</p>`;
        totalPrice.textContent = '0đ';
        return;
    }

    let html = '';
    let totalAll = 0;

    cartItems.forEach(item => {
        html += `
<div class="card mb-3" style="border:solid 0.05rem black;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${item.imageUrl}" class="img-fluid rounded-start" alt="${item.name}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Số lượng: ${item.qty}</p>
                <p class="card-text">Đơn giá: ${item.price}.000đ</p>
                <p class="card-text fw-bold">Thành tiền: ${item.total}.000đ</p>
                <button class="btn btn-danger btn-sm btn-remove" data-name="${item.name}">Xoá</button>
                <button class="btn btn-success btn-sm btn-buy" data-name="${item.name}">Mua ngay</button>
            </div>
        </div>
    </div>
</div>`;
        totalAll += item.total;
    });

    html += `
<div class="text-end">
    <button class="btn btn-outline-danger mt-3" id="clear-cart">Xoá tất cả sản phẩm</button>
</div>`;

    cartContainer.innerHTML = html;
    totalPrice.textContent = `${totalAll}.000đ`;

    // Xoá từng sản phẩm (filter theo name)
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            cartItems = cartItems.filter(item => item.name !== productName);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Cập nhật lại giỏ hàng sau khi xóa
            location.reload();
        });
    });

    // Xoá tất cả sản phẩm
    document.getElementById('clear-cart').addEventListener('click', function () {
        if (confirm("Bạn có chắc chắn muốn xoá toàn bộ giỏ hàng?")) {
            localStorage.removeItem('cartItems');
            location.reload();
        }
    });

    // (Tuỳ chọn) Xử lý nút "Mua ngay" nếu cần
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            alert(`Bạn chọn mua ngay sản phẩm: ${productName}`);
            // Thêm xử lý thanh toán hoặc chuyển sang trang thanh toán nếu có
        });
    });
});
