function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'right');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');

        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message;

        const messageTime = document.createElement('div');
        messageTime.classList.add('message-time');
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageBubble.appendChild(messageText);
        messageBubble.appendChild(messageTime);
        messageContent.appendChild(messageBubble);

        const avatar = document.createElement('img');
        avatar.src = 'vladislav-avatar.png'; // Путь к аватару Владислава
        avatar.alt = 'Vladislav';
        avatar.classList.add('avatar');

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
        chatMessages.appendChild(messageDiv);

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
