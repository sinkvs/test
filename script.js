let soundEnabled = false;
let audioContext;
let audioBuffer;

document.addEventListener('DOMContentLoaded', async function() {
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
        playNotificationSound();
    }

    async function playNotificationSound() {
        if (soundEnabled) {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (!audioBuffer) {
                try {
                    const response = await fetch('audio/telegram-notification.mp3');
                    const arrayBuffer = await response.arrayBuffer();
                    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                } catch (error) {
                    console.error('Error loading audio file:', error);
                    return;
                }
            }
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0);
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

                    // Вычисляем задержку на основе длины текста
                    const baseDelay = 2000; // Базовая задержка в миллисекундах
                    const additionalDelayPerChar = 50; // Дополнительная задержка за каждый символ
                    const delay = baseDelay + (message.text.length * additionalDelayPerChar);

                    setTimeout(displayMessage, delay);
                }, 1000);
            }
        }
    }

    displayMessage();

    // Включить звук после первого касания экрана
    document.addEventListener('touchstart', enableSound, { once: true });
    // Включить звук после первого клика мыши
    document.addEventListener('click', enableSound, { once: true });
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
