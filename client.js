const socket = io('http://localhost:8000');

const form = document.getElementById('send-box');
const messageInput = document.getElementById('messageInput');
const messageBox = document.querySelector('.container');
var audio =new Audio('/Ping.mp3');

const append = (message , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageBox.append(messageElement);
    if(position == 'others')
    audio.play();
}

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'your');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter Your Name");
socket.emit('new-user-joined',name);

socket.on('user-joined' , name => {
    append(`${name} joined the chat`,'your');
})

socket.on('receive' , data => {
    append(`${data.name}: ${data.message} `,'others');
})

socket.on('left',name => {
    append(`${name} has left the chat room`,'others')
})
