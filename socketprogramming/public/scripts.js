// public/scripts.js
const socket = io(); // connect to server
const numberElement = document.getElementById('number');

// listen for number event
socket.on('number', (num) => {
  console.log('Received number:', num);
  numberElement.textContent = num;
});


