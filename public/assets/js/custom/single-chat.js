const singleChatSocket = io('/chat');
let chatBox = document.getElementById("chat_box")
var senderID;
var senderName;
(async () => {
    const response = await fetch('http://localhost:3000/contacts')
    const contacts = await response.json()

    const user = await fetch('http://localhost:3000/user')
    const currentUser = await user.json()

    senderID = currentUser.id
    senderName = currentUser.name

    sendMessage = async (receiverID) => {
        let text = document.getElementById('message').value
        let chatBox = document.getElementById("chat_box")
        singleChatSocket.emit('new_msg', {senderName, senderID, receiverID, text})
        chatBox.innerHTML += ' <div class="d-flex justify-content-end mb-4">' +
            '                        <div class="msg_cotainer_send">' +
            '<span class="user_name"> Me</span>' +
            '<p>' + text + '</p>' +
            '                            <span class="msg_time_send">' + moment().format("hh:mm A") + '</span>' +
            '                        </div>\n' +

            '                    </div>'

        text=""
    }

    ShowChatWindow = async (person) => {
        let chatBox = document.getElementById("chat_box")
        chatBox.innerHTML = "";

        let a, b;
        console.log(senderID)
        if (senderID < person.id) {
            a = senderID.toString(), b = (person.id).toString()
        } else {
            b = senderID.toString(), a = (person.id).toString()
        }
        singleChatSocket.emit('join', {a, b})

        const _id = person.id
        console.log(_id)

        let sendBtn = document.querySelector(".send_btn").setAttribute("id", _id)
        console.log(sendBtn)
        const response = await fetch('http://localhost:3000/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id.toString()
            })
        })
        const _response = await response.json()
        console.log(_response)
        console.log(_response.data[0])
        chatBox.innerHTML = ""
        if (_response.data.length === 0) {
            chatBox.innerHTML = "<p class='text-center text-info'>Start the conversation</p>"
        } else {
            _response.data[0].messages.forEach((e) => {
                if (e.sender.id === _id) {
                    chatBox.innerHTML += ' <div class="d-flex justify-content-start mb-4">' +
                        '                        <div class="msg_cotainer">' +
                        '<span class="user_name">' + e.sender.name + '</span>' +
                        '<p>' + e.text + '</p>' +
                        '<span class="msg_time">' + e.timestamp + '</span>' +
                        '                        </div>\n' +

                        '                    </div>'
                } else {
                    chatBox.innerHTML += ' <div class="d-flex justify-content-end mb-4">' +
                        '                        <div class="msg_cotainer_send">' +
                        '<span class="user_name"> Me</span>' +
                        '<p>' + e.text + '</p>' +
                        '                            <span class="msg_time_send">' + e.timestamp + '</span>' +
                        '                        </div>\n' +

                        '                    </div>'
                }
            })
        }
    }

    let ul = document.getElementById("contact-list")
    let str = ""

    contacts.forEach((e) => {
        str += `<li class="" id="${e._id}" onclick="return ShowChatWindow(this)">
        <div class="d-flex bd-highlight">
            <div class="img_cont">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img">
                <span class="online_icon"></span> 
            </div>
            <div class="user_info">
                <span>${e.nick_name}</span>
               
            </div>
        </div>
    </li>`
    })
    ul.innerHTML += str;
})()
singleChatSocket.on("new_msg", (data) => {
    chatBox.innerHTML += ' <div class="d-flex justify-content-start mb-4">' +
        '                        <div class="msg_cotainer">' +
        '<span class="user_name">' + data.name + '</span>' +
        '<p>' + data.text + '</p>' +
        '<span class="msg_time">' + moment().format("hh:mm A") + '</span>' +
        '                        </div>\n' +

        '                    </div>'
})
