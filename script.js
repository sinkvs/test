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

     // Предварительная загрузка изображений
    messages.forEach(message => {
        if (message.avatar) {
            const img = new Image();
            img.src = message.avatar;
        }
    });
    
    function displayMessage() {
        if (index < messages.length) {
            const message = messages[index];

            if (message.notification) {
                // Создать уведомление о добавлении в чат
                const notificationDiv = document.createElement('div');
                notificationDiv.classList.add('notification');
                notificationDiv.textContent = message.notification;
                chatMessages.appendChild(notificationDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                index++;
                setTimeout(displayMessage, 2000); // Задержка в 2 секунды между сообщениями
            } else {
                // Обновить уведомление "(имя) пишет..."
                typingIndicator.textContent = `${message.sender} пишет...`;

                setTimeout(() => {
                    // Очистить уведомление "(имя) пишет..."
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

                    // Воспроизвести звук уведомления для любого сообщения
                    const audio = new Audio('audio/telegram-notification.mp3');
                    audio.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });

                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    index++;
                    setTimeout(displayMessage, 2000); // Задержка в 2 секунды между сообщениями
                }, 1000); // Задержка в 1 секунду для уведомления "(имя) пишет..."
            }
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

        // Воспроизвести звук уведомления
        const audio = new Audio('audio/telegram-notification.mp3');
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
        });

        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
