body {
    font-family: Arial, sans-serif;
    background: url('background.jpg') no-repeat center center fixed;
    background-size: cover;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
}
.chat-container {
    width: 375px;
    height: 667px;
    background-color: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
}
.chat-header {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
}
.group-info {
    display: flex;
    flex-direction: column;
}
.group-name {
    font-size: 1.2em;
    font-weight: bold;
}
.member-count {
    font-size: 0.8em;
    color: #aaa;
}
.header-icons {
    display: flex;
    gap: 10px;
}
.icon {
    font-size: 1.2em;
    color: #aaa;
}
.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
.message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    max-width: 100%;
}
.message.left {
    flex-direction: row;
}
.message.right {
    flex-direction: row-reverse;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
.message-bubble {
    background-color: #e0e0e0;
    color: #000;
    padding: 10px;
    border-radius: 15px;
    position: relative;
    max-width: 70%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.message.right .message-bubble {
    background-color: #008000;
    color: white;
    margin-left: 10px;
}
.message-sender {
    font-weight: bold;
    margin-bottom: 5px;
}
.message-text {
    font-size: 0.9em;
}
.message-time {
    font-size: 0.7em;
    color: #aaa;
    text-align: right;
    position: absolute;
    bottom: 5px;
    right: 10px;
}
.chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #333;
    background-color: #111;
}
.chat-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 20px;
    background-color: #222;
    color: white;
}
.chat-input button {
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}
