document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        { sender: 'Владимир', text: 'Привет всем!', avatar: 'images/vladimir-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Так, Константинчик, что ты задумал снова?', avatar: 'images/leonid-avatar.jpg', side: 'left' },
        { sender: 'Константин', text: 'Леонид, нужна ваша активная помощь', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Константин', text: 'Нужно чтобы вы провели квест!', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владислав', text: 'Отличная идея, давайте обсудим))', avatar: 'images/vladislav-avatar.jpg', side: 'right' }б
        { sender: 'Леонид', text: 'Что, какой еще квест?', avatar: 'images/leonid-avatar.jpg', side: 'left' }
    ];

    const chatMessages = document.getElementById('chat-messages');
    let index = 0;

    function displayMessage() {
        if (index < messages.length) {
            const message = messages[index];
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', message.side);

            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');

            const sender = document.createElement('div');
            sender.classList.add('message-sender');
            sender.textContent = message.sender;

            const text = document.createElement('div');
            text.classList.add('message-text');
            text.textContent = message.text;

            const avatar = document.createElement('img');
            avatar.src = message.avatar;
            avatar.alt = message.sender;
            avatar.classList.add('avatar');

            messageContent.appendChild(sender);
            messageContent.appendChild(text);
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(avatar);
            chatMessages.appendChild(messageDiv);

            // Воспроизвести звук уведомления только для сообщений от других пользователей
            if (message.side === 'left') {
                const audio = new Audio('audio/notification.mp3');
                audio.play();
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
            index++;
            setTimeout(displayMessage, 2000); // Задержка в 2 секунды между сообщениями
        }
    }

    displayMessage();
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'right');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        const avatar = document.createElement('img');
        avatar.src = 'images/vladislav-avatar.png'; // Путь к аватару Владислава
        avatar.alt = 'Vladislav';
        avatar.classList.add('avatar');

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
        chatMessages.appendChild(messageDiv);

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
