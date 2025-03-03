let soundEnabled = false;
let audioContext;
let audioBuffer;

document.addEventListener('DOMContentLoaded', async function() {
    const messages = [
        { sender: 'Константин', text: 'Всем привет! Пора обсудить, что мы будем покупать и как поздравим 8 марта.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владимир', text: 'Надо всех добавить.', avatar: 'images/vladimir-avatar.png', side: 'left' },
        { notification: 'Владимир добавлен' },
        { notification: 'Алексей добавлен' },
        { sender: 'Константин', text: 'Леонид, нам нужна ваша активная помощь.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { notification: 'Кирилл добавлен' },
        { notification: 'Роман добавлен' },
        { sender: 'Леонид', text: 'Константинчик, черт возьми, что ты опять замыслил?', avatar: 'images/leonid-avatar.png', side: 'left' },
        { notification: 'Владислав добавлен' },
        { sender: 'Константин', text: 'В общем, идея такая – будете проводить квест.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Ооо нет, нет, нет, я категорически против. Знаете, нужен кто-то молодой, резвый, креативный, а я уже, так скажем, старый – у меня и память подводит, и фантазия тускнеет. Ставку надо делать на молодежь, на тех, у кого энергия прям, знаешь, шкалит!', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'Безусловно, Леонид! Поэтому мы сделали ставку на молодежь, и у нас викторина будет виртуальная – современная, динамичная.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Даа лааадно.. 😳😳', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Владимир', text: 'Леонид, ваша харизма придаёт любому мероприятию особый шарм))', avatar: 'images/vladimir-avatar.png', side: 'left' },
        { sender: 'Владислав', text: 'Я уже предвкушаю)))', avatar: 'images/vladislav-avatar.png', side: 'right' },
        { sender: 'Константин', text: 'Так вот, мы уверены, что даже в виртуальной форме нужна ваша индивидуальность, а советы и оригинальные идеи сделают викторину незабываемой.', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Ладно, ничего без меня не можете сделать! Беру на себя главную роль – готовьтесь, ребята, будет эпически!', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'Вот это настрой! Теперь мы точно знаем, что праздник будет зажигательным. Приступаем!', avatar: 'images/konstantin-avatar.jpg', side: 'left' }
    ];

    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const peekButton = document.getElementById('peek-button');
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

    peekButton.addEventListener('click', () => {
        document.querySelector('.initial-message').remove();
        peekButton.remove();
        enableSound();
        displayMessage();
    });
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
