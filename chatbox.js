const chatBox = document.getElementById("chat-box");
            const chatContainer = document.getElementById("chat-container");

            function toggleChat() {
                chatContainer.classList.toggle("active");
                chatBox.scrollTop = chatBox.scrollHeight;
            }

            window.onload = () => {
                const saved = localStorage.getItem("chat");
                if (saved) chatBox.innerHTML = saved;
                chatBox.scrollTop = chatBox.scrollHeight;
            }

            function sendMessage() {
                const input = document.getElementById("user-input");
                const message = input.value.trim();
                if (message === "") return;

                addMessage("user", message);
                respond(message.toLowerCase());
                input.value = "";
            }

            function addMessage(sender, text) {
                const msg = document.createElement("div");
                msg.className = `chat-message ${sender}`;
                msg.textContent = text;
                chatBox.appendChild(msg);
                chatBox.scrollTop = chatBox.scrollHeight;
                localStorage.setItem("chat", chatBox.innerHTML);
            }

            function speak(text) {
                const synth = window.speechSynthesis;
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = "vi-VN";
            }
            function sendMessage() {
                    const input = document.getElementById("user-input");
                    const message = input.value.trim();
                    if (message === "") return;

                    addMessage("user", message);  // User tin nhắn luôn ở trên
                    respond(message.toLowerCase());
                    input.value = "";
                }

                function addMessage(sender, text) {
                    const msg = document.createElement("div");
                    msg.className = `chat-message ${sender}`;
                    msg.textContent = text;
                    chatBox.insertBefore(msg, chatBox.firstChild);  // Thêm user tin nhắn vào đầu

                    chatBox.scrollTop = chatBox.scrollHeight;
                    localStorage.setItem("chat", chatBox.innerHTML);
                }
                // Xóa tất cả tin nhắn trong chat
                    function clearChat() {
                        chatBox.innerHTML = '';  // Xóa toàn bộ tin nhắn
                        localStorage.removeItem("chat");  // Xóa lưu trữ trong localStorage
                    }


            function respond(message) {
                let response = "Tớ chưa hiểu bạn nói gì 😅";

              if (/hello|hi|xin chào|chào|hey/.test(message)) {
                response = "Chào bạn! Mình là Hu Tao, chatbot của Chill Coffee! Cảm ơn bạn đã ghé qua, bạn có muốn thử một món đồ uống mới không? 😊";
                } else if (/khỏe|ổn không/.test(message)) {
                    response = "Mình khỏe lắm! Cảm ơn bạn đã hỏi. Còn bạn thì sao? Bạn có thích đồ uống ở Chill Coffee không? 😄";
                } else if (/tên|bạn là ai/.test(message)) {
                    response = "Mình là Hu Tao, chatbot đáng yêu của Chill Coffee! Mình có thể giúp bạn với món đồ uống hoặc thông tin gì không? 💖";
                } else if (/giúp|hỗ trợ/.test(message)) {
                    response = "Mình ở đây để giúp bạn! Cần gì, cứ hỏi mình nhé! Chắc chắn sẽ không để bạn thất vọng đâu 😜";
                } else if (/menu|thực đơn|các món|đồ uống|thức uốnguống/.test(message)) {
                    response = "Thực đơn của Chill Coffee đầy đủ các món đồ uống hấp dẫn đấy! Bạn có thể xem menu tại đây: <a href='/menu.html'>Menu</a> để biết thêm chi tiết!";
                } else if (/đặt hàng|order/.test(message)) {
                    response = "Đặt hàng nhanh gọn lẹ tại đây: <a href='/order.html'>Đặt hàng</a>. Bạn có muốn thử món nào đặc biệt không? 😋";
                } else if (/cảm ơn|cảm ơn bạn/.test(message)) {
                    response = "Không có gì đâu, bạn thật dễ thương! 😘 Mình rất vui khi được giúp bạn!";
                } else if (/tạm biệt|bye|hẹn gặp lại/.test(message)) {
                    response = "Tạm biệt bạn nhé! Hẹn gặp lại tại Chill Coffee lần sau! 🌸";
                } else if (/giá|bao nhiêu/.test(message)) {
                    response = "Giá các món sẽ được hiển thị trên menu. Bạn có thể tham khảo tại đây: <a href='/menu.html'>Menu</a> nhé!";
                } else if (/địa chỉ|địa điểm/.test(message)) {
                    response = "Chill Coffee có địa chỉ tại: Tầng 5, 71 Nguyễn Chí Thanh, Phường Láng Hạ, Quận Đống Đa, Hà Nội. Đến đây uống cà phê nhé! ☕";
                } else if (/số điện thoại|hotline/.test(message)) {
                    response = "Số điện thoại của Chill Coffee là: 02477717888 (Hà Nội) và 02877717789 (TP.HCM). Liên hệ ngay để được hỗ trợ!";
                } else if (/xóa hội thoại|clear|xóa/.test(message)) {
                    response = "Được thôi, mình sẽ xóa hết hội thoại của chúng ta. Để làm mới mọi thứ nhé! 🔥";
                } else if (/giảm giá|khuyến mãi/.test(message)) {
                    response = "Chill Coffee luôn có các chương trình khuyến mãi hấp dẫn. Bạn có thể theo dõi fanpage để cập nhật thông tin mới nhất! 🎉";
                } else if (/thực đơn|menu/.test(message)) {
                    response = "Menu của chúng mình có rất nhiều món hấp dẫn đấy. Bạn thích uống gì? ☕🍹";
                } else if (/đồ ăn|thức ăn/.test(message)) {
                    response = "Chill Coffee cũng có đồ ăn nhẹ ngon miệng cho bạn đó. Bạn có muốn thử một món ăn vặt không? 🍪";
                } else if (/tìm kiếm|tìm hiểu/.test(message)) {
                    response = "Mình luôn sẵn sàng giúp bạn tìm kiếm thông tin về Chill Coffee. Cứ hỏi mình nhé! 📱";
                } else if (/sự kiện|chương trình/.test(message)) {
                    response = "Chill Coffee luôn tổ chức các sự kiện vui nhộn và thú vị! Hãy tham gia nhé, bạn sẽ không muốn bỏ lỡ đâu! 🎶🎉";
                } else if (/khách hàng|khách mời/.test(message)) {
                    response = "Tất cả khách hàng của Chill Coffee đều đặc biệt! Dù bạn là khách mời hay khách quen, chúng mình luôn chào đón bạn! 💕";
                } else if (/thư giãn|nghỉ ngơi/.test(message)) {
                    response = "Chill Coffee là nơi lý tưởng để thư giãn sau một ngày làm việc căng thẳng. Cùng ngồi lại, uống trà và thư giãn nào! 🌿";
                } else if (/cà phê|trà sữa|trà|nước uống/.test(message)) {
                    response = "Chill Coffee có rất nhiều đồ uống ngon tuyệt vời như cà phê, trà sữa và trà. Bạn muốn thử món nào? ☕🥤";
                } else if(/|giới thiệu về chill coffee/.test(message)) {
                    response = "Chill Coffee là một quán cà phê nổi tiếng với không gian đẹp và đồ uống ngon. Không chỉ thế mà chúng mình còn có dịch vụ chăm sóc khách hàng đặc biệt, phòng ốc đảm bảo sự riêng tư của bạn. Chúng mình luôn luôn chào đón bạn đến thưởng thức! 🌟";
                }
                else {
                    response = "Mình chưa hiểu câu hỏi của bạn. Bạn có thể thử hỏi lại không? Mình sẽ cố gắng trả lời tốt hơn! 😅";
                }
                


                setTimeout(() => {
                    addMessage("bot", response);
                    speak(response);
                }, 500);
            }