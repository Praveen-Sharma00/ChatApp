let currentUser;
const groupChatSocket=io('/group-chat');

(async () => {
    const response = await fetch('http://localhost:3000/user')
    const currentUser = await response.json()

    const msg_response = await fetch('http://localhost:3000/group_chats');
    const conv = await  msg_response.json();
    console.log(conv)

    let chatBox = document.getElementById("chat_box")
    chatBox.innerHTML="";

    if(conv.messages.length === 0){
        chatBox.innerHTML="<p class='text-center text-info'>Start the conversation</p>"
    }
    else{
        conv.messages.forEach((e)=>{
            if(e.sender.id !== currentUser._id){
                chatBox.innerHTML += ' <div class="d-flex justify-content-start mb-4">' +
                    '                        <div class="msg_cotainer">' +
                    '<span class="user_name">'+e.sender.name+'</span>' +
                    '<p>' + e.text + '</p>' +
                    '<span class="msg_time">'+e.timestamp+'</span>' +
                    '                        </div>\n' +

                    '                    </div>'
            }
            else{
                chatBox.innerHTML +=' <div class="d-flex justify-content-end mb-4">' +
                    '                        <div class="msg_cotainer_send">' +
                    '<span class="user_name"> Me</span>' +
                    '<p>' + e.text + '</p>' +
                    '                            <span class="msg_time_send">'+e.timestamp+'</span>' +
                    '                        </div>\n' +

                    '                    </div>'
            }
        })
    }
    groupChatSocket.emit('join', {groupName:"default",currentUser})
    groupChatSocket.on('new_msg', (data) => {
        let text = data.text
        let chatBox = document.getElementById("chat_box")
        chatBox.innerHTML += ' <div class="d-flex justify-content-start mb-4">' +
            '                        <div class="msg_cotainer">' +
            '<span class="user_name">'+data.currentUser.name+'</span>' +
            '<p>' + text + '</p>' +
            '                            <span class="msg_time">'+moment().format("hh:mm A")+'</span>' +
            '                        </div>\n' +

            '                    </div>';
    })

    sendMessage = function () {
        let text = document.getElementById('message').value
        let chatBox = document.getElementById("chat_box")
        chatBox.innerHTML += ' <div class="d-flex justify-content-end mb-4">' +
            '                        <div class="msg_cotainer_send">' +
            '<span class="user_name"> Me</span>' +
            '<p>' + text + '</p>' +
            '                            <span class="msg_time_send">'+moment().format("hh:mm A")+'</span>' +
            '                        </div>\n' +

            '                    </div>';
            document.getElementById('message').value=" ";
        groupChatSocket.emit('new_msg', {groupName:"default",currentUser,text})
    }


})()
