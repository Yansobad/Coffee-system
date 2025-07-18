// Hiển thị danh sách sản phẩm
function getProductList(container, limit) {
    let htmls = '';
    db.collection('products')
        .orderBy('createdAt', 'desc') // Lấy sản phẩm mới nhất
        .limit(limit) // Giới hạn chỉ lấy 4 sản phẩm
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productId = doc.id;
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
                htmls += `
                    <div class="product-item col-md-3 col-6">
                        <div class="content">
                            <img src="${product.imageUrl}" alt="${product.name}">
                            <div class="text p-2">
                                <div class="d-flex justify-content-between">
                                    <h6>${product.name}</h6>
                                    <h6>${formattedPrice}</h6>
                                </div>
                                <button class="btn btn-primary btn-order" data-id=${productId}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = htmls;

            let btnOrder = document.querySelectorAll('.btn-order');
            btnOrder.forEach(btn => {
                btn.addEventListener('click', function () {
                    const productId = this.getAttribute('data-id');
                    checkSession();
                    showOrderForm(productId);
                });
            });

        })
        .catch((error) => {
            console.error("Error fetching products: ", error);
        });
}

function showOrderForm(productId) {
    let orderForm = document.querySelector(".order-form");
    orderForm.style.display = 'block';

    // Lấy thông tin sản phẩm by id
    db.collection('products').doc(productId).get()
        .then((doc) => {
            if (doc.exists) {
                const product = doc.data();
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
                // Hiển thị thông tin sản phẩm trong form đặt hàng
                orderForm.style.display = 'block';
                orderForm.innerHTML = `
                        <div class="content p-2 rounded-md">
                            <button class="btn text-black btn-cancel">Đóng</button>
                            <div class="row">
                                <div class="col-md-4 col-12">
                                    <img src="${product.imageUrl}" alt="${product.name}">
                                </div>
                                <div class="col-md-8 col-12">
                                    <h5>${product.name}</h5>
                                    <p>Giá: ${formattedPrice}</p>
                                    <form id="order-form">
                                        <div>
                                            <label for="quantity">Số lượng</label>
                                            <input type="number" id="quantity" value="1" min="1">
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-4 btn-confirm-order" data-price=${product.price}>Xác nhận</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `;

                // Thêm sự kiện cho nút đóng form
                const btnCancel = orderForm.querySelector('.btn-cancel');
                btnCancel.addEventListener('click', function () {
                    orderForm.innerHTML = '';
                    orderForm.style.display = 'none';
                });

                // Thêm sự kiện cho form đặt hàng
                const btnConfirmOrder = document.querySelector(".btn-confirm-order");
                btnConfirmOrder.addEventListener('click', function (e) {
                    e.preventDefault();
                    const quantity = document.getElementById('quantity').value;
                    const productPrice = this.getAttribute('data-price');
                    handleOrder(productId, quantity, productPrice);
                });

            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });

}

// Xử lý order
function handleOrder(productId, quantity, productPrice) {
    if (!userSession) {
        return;
    }

    let authorEmail = userSession.user.email;

    // Kiểm tra thông tin người dùng theo email
    db.collection("users").where("email", "==", authorEmail)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let author = { ...doc.data() };
                const totalCost = productPrice * quantity; // Tính tổng chi phí

                // Kiểm tra số dư ví của người dùng
                if (author.balance < totalCost) {
                    alert("Số dư ví không đủ!");
                    return;
                }

                // Lấy thông tin sản phẩm
                db.collection("products").doc(productId)
                    .get()
                    .then((productDoc) => {
                        const orderData = {
                            author: authorEmail, // Người đặt hàng
                            product: productDoc.data(),
                            quantity: quantity,
                            status: 0, // Trạng thái đơn hàng (0: đang xử lý)
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        };

                        // Lưu đơn hàng vào Firestore
                        db.collection('orders').add(orderData)
                            .then(() => {
                                // Cập nhật lại số dư ví của người dùng
                                return db.collection('users').where("email", "==", authorEmail).get();
                            })
                            .then((userSnapshot) => {
                                if (!userSnapshot.empty) {
                                    // Cập nhật số dư ví sau khi đặt hàng
                                    const userDoc = userSnapshot.docs[0];
                                    return userDoc.ref.update({
                                        balance: userDoc.data().balance - totalCost // Trừ số dư ví
                                    });
                                } else {
                                    throw new Error("Không tìm thấy người dùng.");
                                }
                            })
                            .then(() => {
                                alert("Đặt hàng thành công!");
                                document.querySelector(".order-form").style.display = 'none'; // Ẩn form đặt hàng
                            })
                            .catch((error) => {
                                console.error("Error placing order or updating balance: ", error);
                            });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

            });
        })
        .catch((error) => {
            console.log("Error getting user data: ", error);
        });
}
