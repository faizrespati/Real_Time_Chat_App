const socket = io(); // Connect to the WebSocket server

const chatMessages = document.getElementById('chat-messages');
const inputBox = document.getElementById('input-box');
const username = prompt('Masukkan username Anda:'); // Mengambil username dari pengguna

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = inputBox.value;
    if (message.trim() !== '') {
      const messageObj = { username, message };
      socket.emit('message', messageObj); // Send the message object to the server
      inputBox.value = '';
    }
  }
});

socket.on('message', (messageObj) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = `${messageObj.username}: ${messageObj.message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom of the chat
});
