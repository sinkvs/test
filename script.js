const messages = [
    { name: "Константин", text: "Всем привет! Как дела?" },
    { name: "Леонид", text: "Привет! У меня все отлично, как у вас?" },
    { name: "Владислав", text: "Я только что с работы, уставший немного..." },
    { name: "Владимир", text: "А я наоборот — день был легкий." },
    { name: "Константин", text: "Круто! Может, на выходных встретимся?" },
    { name: "Леонид", text: "Да, хорошая идея! Где встречаемся?" }
];

function addMessage(name, text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "other-message");
    messageDiv.innerHTML = `<strong>${name}</strong>${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    document.getElementById("notification-sound").play();
}

function showTyping() {
    document.getElementById("typing").style.display = "block";
}

function hideTyping() {
    document.getElementById("typing").style.display = "none";
}

function startChat() {
    let i = 0;
    function nextMessage() {
        if (i < messages.length) {
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage(messages[i].name, messages[i].text);
                i++;
                setTimeout(nextMessage, 2000);
            }, 1500);
        }
    }
    setTimeout(nextMessage, 2000);
}

startChat();
