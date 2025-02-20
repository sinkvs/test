/* script.js */
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'right');

        const avatar = document.createElement('img');
        avatar.src = 'vladislav-avatar.png'; // Placeholder for Vladislav's avatar
        avatar.alt = 'Vladislav';
        avatar.classList.add('avatar');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
