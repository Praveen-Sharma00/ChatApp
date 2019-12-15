let currentUser;
let socket = io();
const fetchUserData = async () => {
    const response = await fetch('http://localhost:3000/user')
    let data = await response.json()
    return data
}
fetchUserData().then(data => {
    currentUser = data
    console.log(currentUser)
    socket.emit('user_connected', currentUser)

})

sendMessage=function () {
    let text = document.getElementById('message').value
    // console.log(text)
    console.log(currentUser)
    // socket.emit('new_message',(currentUser,text))

}


