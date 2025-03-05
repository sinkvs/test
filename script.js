let soundEnabled = false;
let audioContext;
let audioBuffer;

document.addEventListener('DOMContentLoaded', async function() {
    const messages = [
        { notification: 'Владимир добавлен' },
        { notification: 'Алексей добавлен' },
        { notification: 'Владимир добавлен' },
        { notification: 'Константин добавлен' },
        { notification: 'Леонид добавлен' },
        { notification: 'Олег Валерьянович добавлен' },
        { notification: 'Кирилл добавлен' },
        { notification: 'Андрей Николаевич добавлен' },
        { notification: 'Александр добавлен' },
        { notification: 'Роман добавлен' },
        { notification: 'Владислав добавлен' },
        
        { sender: 'Константин', text: 'Всем привет! Пора обсудить, как мы будем поздравлять на 8 марта. Есть пара идей....', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        
        { sender: 'Константин', text: 'Леонидддд,  готовьтесь, это будет новый уровень)) понадобится Ваша помощь...', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Константинчик, черт возьми, что ты опять задумал?🤨', avatar: 'images/leonid-avatar.png', side: 'left' },
        { sender: 'Константин', text: 'Идея следующая! Значит, нужно приготовить подарок, который участницы смогут получить при прохождении онлайн викторины, отвечая на вопросы, а саму викторину будет проводить специально обученный и подготовленный  человек👨‍🦱, артистичный🙆,  веселый🙅, мощный🤦 ЛЕОНИД))).', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владислав', text: 'Идея пушка)))🔫', avatar: 'images/vladislav-avatar.png', side: 'right' },
        { sender: 'Леонид', text: 'Ооо нет, нет, нет, я против. Знаете, нужен кто-то молодой, резвый, креативный, а я уже, так скажем, старый👨‍🦳 – у меня и память и фантазия уже не та.... Ставку надо делать на молодежь, на тех, у кого энергия прям, знаешь, шкалит!', avatar: 'images/leonid-avatar.png', side: 'left' },
        
        { sender: 'Андрей Николаевич', text: 'Леня, соберись, не дрейфь!', avatar: 'images/mihal-avatar.png', side: 'left' },
        
        { sender: 'Константин', text: 'Проведем голосование, кто за кандидатуру Леонида???🗽📜', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        
        { sender: 'Константин', text: '+', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Владимир', text: '+', avatar: 'images/gorkov-avatar.png', side: 'left' },       
        { sender: 'Андрей Николаевич', text: '+', avatar: 'images/mihal-avatar.png', side: 'left' },
        { sender: 'Александр', text: '+', avatar: 'images/alexandr-avatar.png', side: 'left' },
        { sender: 'Владимир', text: '+', avatar: 'images/vladimir-avatar.png', side: 'left' },
        { sender: 'Алексей', text: '+', avatar: 'images/alexey-avatar.png', side: 'left' },        
        { sender: 'Олег Валерьянович', text: '+', avatar: 'images/oleg-avatar.png', side: 'left' },
        { sender: 'Кирилл', text: '+', avatar: 'images/kirill-avatar.png', side: 'left' },
        { sender: 'Роман', text: '+', avatar: 'images/roman-avatar.png', side: 'left' },
        { sender: 'Владислав', text: '+', avatar: 'images/vladislav-avatar.png', side: 'right' },
        
        { sender: 'Константин', text: 'Отлично, единогласно!👏 Леонид, обратного пути нет!) 🤝', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        { sender: 'Леонид', text: 'Даа лааадно.. 😳😳', avatar: 'images/leonid-avatar.png', side: 'left' },
        
        { sender: 'Владимир', text: 'Леонид, ну куда нам без Вас то))', avatar: 'images/vladimir-avatar.png', side: 'left' },        
        { sender: 'Владислав', text: 'Уже предвкушаю)))😅', avatar: 'images/vladislav-avatar.png', side: 'right' },
        
        { sender: 'Константин', text: 'Всё будет чики-бамбони👌', avatar: 'images/konstantin-avatar.jpg', side: 'left' },
        
        { sender: 'Леонид', text: 'Ладно, ничего без меня не можете сделать! Беру на себя главную роль – готовьтесь, ребята, будет эпично!', avatar: 'images/leo_ochki.jpg', side: 'left' },
        
        { sender: 'Константин', text: 'Эт по нашему! Погнали🏎️', avatar: 'images/konstantin-avatar.jpg', side: 'left' }
    ];

    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const peekButton = document.getElementById('peek-button');
    const overlay = document.getElementById('overlay');
    const nextButton = document.getElementById('next-button');
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
                    const baseDelay = 1000; // Уменьшенная базовая задержка в миллисекундах
                    const additionalDelayPerChar = 20; // Уменьшенная дополнительная задержка за каждый символ
                    const delay = baseDelay + (message.text.length * additionalDelayPerChar);

                    setTimeout(displayMessage, delay);
                }, 1000);
            }
        } else {
            // Показать кнопку после завершения диалога
            overlay.style.display = 'flex';
        }
    }

    peekButton.addEventListener('click', () => {
        document.querySelector('.initial-message').remove();
        peekButton.remove();
        enableSound();
        displayMessage();
    });

    nextButton.addEventListener('click', () => {
        // Переход к следующей части сайта
        window.location.href = 'next-page.html'; // Замените на нужный URL
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
