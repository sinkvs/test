/* script.js */
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'right');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
