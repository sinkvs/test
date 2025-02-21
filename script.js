:root {
    --chat-background: rgba(10, 14, 14, 0.95);
    --chat-panel-background: #131719;
    --chat-bubble-background: #14181a;
    --chat-add-button-background: #212324;
    --chat-send-button-background: #8147fc;
    --chat-text-color: #a3a3a3;
    --chat-options-svg: #a3a3a3;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

body {
    background: url('https://images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
    background-size: cover;
    margin: 0;
    padding: 0;
}

#chat {
    background: var(--chat-background);
    max-width: 600px;
    margin: 25px auto;
    box-sizing: border-box;
    padding: 1em;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
}

#chat::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1495808985667-ba4ce2ef31b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80') fixed;
    z-index: -1;
}

.btn-icon {
    position: relative;
    cursor: pointer;
}

.btn-icon svg {
    stroke: #FFF;
    fill: #FFF;
    width: 50%;
    height: auto;
}

.btn-icon svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.chat__conversation-board {
    padding: 1em 0 2em;
    height: calc(100vh - 55px - 2em - 25px * 2 - .5em - 3em);
    overflow: auto;
}

.chat__conversation-board__message-container.reversed {
    flex-direction: row-reverse;
}

.chat__conversation-board__message-container.reversed .chat__conversation-board__message__bubble {
    position: relative;
}

.chat__conversation-board__message-container.reversed .chat__conversation-board__message__bubble span:not(:last-child) {
    margin: 0 0 2em 0;
}

.chat__conversation-board__message-container.reversed .chat__conversation-board__message__person {
    margin: 0 0 0 1.2em;
}

.chat__conversation-board__message-container.reversed .chat__conversation-board__message__options {
    align-self: center;
    position: absolute;
    left: 0;
    display: none;
}

.chat__conversation-board__message-container {
    position: relative;
    display: flex;
    flex-direction: row;
}

.chat__conversation-board__message-container:hover .chat__conversation-board__message__options {
    display: flex;
    align-items: center;
}

.chat__conversation-board__message-container:hover .option-item:not(:last-child) {
    margin: 0 .5em 0 0;
}

.chat__conversation-board__message-container:not(:last-child) {
    margin: 0 0 2em 0;
}

.chat__conversation-board__message__person {
    text-align: center;
    margin: 0 1.2em 0 0;
}

.chat__conversation-board__message__person__avatar {
    height: 35px;
    width: 35px;
    overflow: hidden;
    border-radius: 50%;
    user-select: none;
    position: relative;
}

.chat__conversation-board__message__person__avatar::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
}

.chat__conversation-board__message__person__avatar img {
    height: 100%;
    width: auto;
}

.chat__conversation-board__message__person__nickname {
    font-size: 9px;
    color: #484848;
    user-select: none;
    display: none;
}

.chat__conversation-board__message__context {
    max-width: 55%;
    align-self: flex-end;
}

.chat__conversation-board__message__options {
    align-self: center;
    position: absolute;
    right: 0;
    display: none;
}

.chat__conversation-board__message__options .option-item {
    border: 0;
    background: 0;
    padding: 0;
    margin: 0;
    height: 16px;
    width: 16px;
    outline: none;
}

.chat__conversation-board__message__options .emoji-button svg {
    stroke: var(--chat-options-svg);
    fill: transparent;
    width: 100%;
}

.chat__conversation-board__message__options .more-button svg {
    stroke: var(--chat-options-svg);
    fill: transparent;
    width: 100%;
}

.chat__conversation-board__message__bubble span {
    width: fit-content;
    display: inline-table;
    word-wrap: break-word;
    background: var(--chat-bubble-background);
    font-size: 13px;
    color: var(--chat-text-color);
    padding: .5em .8em;
    line-height: 1.5;
    border-radius: 6px;
    font-family: 'Lato', sans-serif;
}

.chat__conversation-board__message__bubble span:not(:last-child) {
    margin: 0 0 .3em;
}

.chat__conversation-board__message__bubble span:active {
    background: var(--chat-bubble-active-background);
}

.chat__conversation-panel {
    background: var(--chat-panel-background);
    border-radius: 12px;
    padding: 0 1em;
    height: 55px;
    margin: .5em 0 0;
}

.chat__conversation-panel__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
}

.chat__conversation-panel__container .panel-item:not(:last-child) {
    margin: 0 1em 0 0;
}

.chat__conversation-panel__button {
    background: grey;
    height: 20px;
    width: 30px;
    border: 0;
    padding: 0;
    outline: none;
    cursor: pointer;
}

.chat__conversation-panel__button.add-file-button {
    height: 23px;
    min-width: 23px;
    width: 23px;
    background: var(--chat-add-button-background);
    border-radius: 50%;
}

.chat__conversation-panel__button.add-file-button svg {
    width: 70%;
    stroke: #54575c;
}

.chat__conversation-panel__button.emoji-button {
    min-width: 23px;
    width: 23px;
    height: 23px;
    background: transparent;
    border-radius: 50%;
}

.chat__conversation-panel__button.emoji-button svg {
    width: 100%;
    fill: transparent;
    stroke: #54575c;
}

.chat__conversation-panel__button.send-message-button {
    background: var(--chat-send-button-background);
    height: 30px;
    min-width: 30px;
    border-radius: 50%;
    transition: .3s ease;
}

.chat__conversation-panel__button.send-message-button:active {
    transform: scale(.97);
}

.chat__conversation-panel__button.send-message-button svg {
    margin: 1px -1px;
}

.chat__conversation-panel__input {
    width: 100%;
    height: 100%;
    outline: none;
    position: relative;
    color: var(--chat-text-color);
    font-size: 13px;
    background: transparent;
    border: 0;
    font-family: 'Lato', sans-serif;
    resize: none;
}

@media only screen and (max-width: 600px) {
    #chat {
        margin: 0;
        border-radius: 0;
    }

    .chat__conversation-board {
        height: calc(100vh - 55px - 2em - .5em - 3em);
    }

    .chat__conversation-board__message__options {
        display: none !important;
    }
}
