const users = [
    { name: "Константин", avatar: "avatars/avatar1.png" },
    { name: "Леонид", avatar: "avatars/avatar2.png" },
    { name: "Владислав", avatar: "avatars/avatar3.png" },
    { name: "Владимир", avatar: "avatars/avatar4.png" }
];

const messages = [
    { name: "Константин", text: "Всем привет! Как дела?" },
    { name: "Леонид", text: "Привет! У меня все отлично, как у вас?" },
    { name: "Владислав", text: "Я только что с работы, уставший немного..." },
    { name: "Владимир", text: "А я наоборот — день был легкий." },
    { name: "Константин", text: "Круто! Может, на выходных встретимся?" },
    { name: "Леонид", text: "Да, хорошая идея! Где встречаемся?" }
];

const chatBox = document.getElementById("chat-box");
const sound = document.getElementById("notification-sound");

function addSystemMessage(text) {
    const div = document.createElement("div");
    div.classList.add("joined");
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping(name) {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing");
    typingDiv.id = "typing";
    typingDiv.textContent = `${name} пишет сообщение...`;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typingDiv = document.getElementById("typing");
    if (typingDiv) {
        typingDiv.remove();
    }
}

function addMessage(name, text, avatar) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "other-message");

    const avatarImg = document.createElement("img");
    avatarImg.src = avatar;
    avatarImg.classList.add("avatar");

    const textDiv = document.createElement("div");
    textDiv.classList.add("message-text");
    textDiv.innerHTML = `<strong>${name}</strong>${text}`;

    messageDiv.appendChild(avatarImg);
    messageDiv.appendChild(textDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    sound.play();
}

function startChat() {
    let i = 0;
    function nextStep() {
        if (i < users.length) {
            addSystemMessage(`${users[i].name} присоединился к беседе`);
            i++;
            setTimeout(nextStep, 2000);
        } else {
            showMessages();
        }
    }
    nextStep();
}

function showMessages() {
    let i = 0;
    function nextMessage() {
        if (i < messages.length) {
            addTyping(messages[i].name);
            setTimeout(() => {
                removeTyping();
                const user = users.find(u => u.name === messages[i].name);
                addMessage(messages[i].name, messages[i].text, user.avatar);
                i++;
                setTimeout(nextMessage, 2000);
            }, 1500);
        }
    }
    setTimeout(nextMessage, 2000);
}

startChat();
