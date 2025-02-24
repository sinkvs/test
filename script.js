let soundEnabled = false;

document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        { sender: 'Константин', text: 'Всем привет! Пора обсудить, что мы будем покупать и как поздравим 8 марта.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владимир', text: 'Надо всех добавить', avatar: 'images/vladimir-avatar.png', side: 'left' },
        { notification: 'Владислав теперь состоит в чате' },
        { sender: 'Константин', text: 'Леонид, нам нужна ваша активная помощь', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Константинчик, черт возьми, что ты опять замыслил?', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'В общем, идея такая, будете проводить квест', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владислав', text: 'О, это круто надо обсудить!', avatar: 'images/vladislav-avatar.png', side: 'right' },
        { sender: 'Леонид', text: 'Чтооо? Какой еще квест?', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'Ваша задача, Леонид, очень проста: вы задаете вопросы, а наши девушки должны на них ответить.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Нууу, даже не знаю, что тебе сказать. Я не Дибров – никогда не был ведущим «Кто хочет стать миллионером?», так откуда мысль, что я супер ведущий? И вообще, пусть Владимир это сделает, я как-то диктором не рожден!', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'Да нет, Леонид, вы не будете зачитывать сами – идея в другом, сейчас всё увидите!', avatar: 'images/konstantin-avatar.jpg', side: 'left' }
    ];

    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    let index = 0;

    function enableSound() {
        soundEnabled = true;
        document.getElementById('sound-notification').style.display = 'none';
        playNotificationSound();
    }

    function playNotificationSound() {
        if (soundEnabled) {
            const audio = new Audio('audio/telegram-notification.mp3');
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }

    function displayMessage() {
        if (index < messages.length) {
            const message = messages[index];

            if (message.notification) {
                const notificationDiv = document.createElement('div');
                notificationDiv.classList.add('notification');
                notificationDiv.textContent = message.notification;
                chatMessages.appendChild(notificationDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                index++;
                setTimeout(displayMessage, 2000);
            } else {
                typingIndicator.textContent = `${message.sender} пишет...`;

                setTimeout(() => {
                    typingIndicator.textContent = '';

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

                    playNotificationSound();

                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    index++;
                    setTimeout(displayMessage, 2000);
                }, 1000);
            }
        }
    }

    displayMessage();

    // Показать уведомление о необходимости включить звук
    document.getElementById('sound-notification').style.display = 'block';

    // Включить звук после взаимодействия пользователя
    document.addEventListener('click', enableSound);
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
        avatar.src = 'images/vladislav-avatar.png';
        avatar.alt = 'Vladislav';
        avatar.classList.add('avatar');

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
        chatMessages.appendChild(messageDiv);

        playNotificationSound();

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}


    // Показать уведомление о необходимости включить звук
    document.getElementById('sound-notification').style.display = 'block';
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
        avatar.src = 'images/vladislav-avatar.png';
        avatar.alt = 'Vladislav';
        avatar.classList.add('avatar');

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(avatar);
        chatMessages.appendChild(messageDiv);

        playNotificationSound();

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
