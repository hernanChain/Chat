const socket = io()

let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click',()=>{
    const messageBody = {
        username: username.value,
        message: message.value
    }
    socket.emit('chat:message',messageBody)
});

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing',username.value)
})

socket.on('chat:message',(data)=>{
    actions.innerHTML = ""
    output.innerHTML += `<p><strong>${data.username}</strong>:${data.message}</p>`
})

socket.on('chat:typing',(data)=>{
    console.log(data);
    actions.innerHTML = `<p><em>${data} is typing </em></p>`
})