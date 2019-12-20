// const _user = new UserData()
// var conversationType ;
// var receiverId;
// const socket = io()
//
//
// _user.getCurrentUser().then((user) => {
//     socket.emit('login', user)
// })
//
// const startConversation = async (id) => {
//     receiverId=id
//     console.log(id)
//     _user.getCurrentUser().then((currentUser)=>{
//         socket.emit('join',{sender:currentUser,rec_id:id,type:conversationType})
//     })
// }


// const generateListHTML = (arr) => {
//     let str = ""
//     arr.forEach((e) => {
//         str += ' <li class="contact" name="' + e.name + '" id="' + e._id + '" onclick="startConversation(this.id)">\n' +
//             '                    <div class="wrap">\n' +
//             '                        <span class="contact-status online"></span>\n' +
//             '                        <img src="http://emilcarlsson.se/assets/louislitt.png" alt=""/>\n' +
//             '                        <div class="meta">\n' +
//             '                            <p class="name">' + e.name + '</p>\n' +
//             '                            <!--                            <p class="preview">You just got LITT up, Mike.</p>-->\n' +
//             '                        </div>\n' +
//             '                    </div>\n' +
//             '                </li>'
//     })
//     return str
// }
//
// const populateBasicUserData = async () => {
//     const {data} = await _user.getUserContacts()
//     const {contacts} = data
//     const user = await _user.getCurrentUser()
//     console.log(contacts)
//     let contact_list = document.getElementById("list")
//     let user_name = document.getElementById("user_name")
//     user_name.innerHTML = user.name
//
//     let list = generateListHTML(contacts)
//
//     if (contacts.length > 0) {
//         contact_list.innerHTML = list
//     } else {
//         contact_list.innerHTML = "<p class='text-center mt-5'>No contacts</p>"
//     }
//     conversationType = "individual"
// }
// const populateBasicGroupData = async () => {
//     const response = await _user.getUserGroups()
//     const {obj} = response.data
//     const user = await _user.getCurrentUser()
//
//     let group_list = document.getElementById("list")
//     let user_name = document.getElementById("user_name")
//     user_name.innerHTML = user.name
//
//     let list = generateListHTML(obj)
//
//     if (obj.length > 0) {
//         group_list.innerHTML = list
//     } else {
//         group_list.innerHTML = "<p class='text-center mt-5'>No Groups</p>"
//     }
//     conversationType = "group"
// }

// (async () => {
//     await populateBasicUserData()
// })()
//
// let loadDefaultData = async () => {
//     await populateBasicUserData()
// }
// let loadGroupData = async () => {
//     await populateBasicGroupData()
// }

var socket;
(async () => {
    socket = io()
    const _user = new UserData()
    const currentUser = await _user.getCurrentUser()
    var conversationType;
    var receiverId;

    socket.emit('login', currentUser)

    startConversation = async (id) => {
        receiverId = id
        socket.emit('join', {sender: currentUser, rec_id: id, type: conversationType})
    }
    const generateListHTML = (arr) => {
        let str = ""
        arr.forEach((e) => {
            str += ' <li class="contact" name="' + e.name + '" id="' + e._id + '" onclick="startConversation(this.id)">\n' +
                '                    <div class="wrap">\n' +
                '                        <span class="contact-status online"></span>\n' +
                '                        <img src="http://emilcarlsson.se/assets/louislitt.png" alt=""/>\n' +
                '                        <div class="meta">\n' +
                '                            <p class="name">' + e.name + '</p>\n' +
                '                            <!--                            <p class="preview">You just got LITT up, Mike.</p>-->\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </li>'
        })
        return str
    }

    const populateBasicUserData = async () => {
        const {data} = await _user.getUserContacts()
        const {contacts} = data

        console.log(contacts)
        let contact_list = document.getElementById("list")
        let user_name = document.getElementById("user_name")
        user_name.innerHTML = currentUser.name

        let list = generateListHTML(contacts)

        if (contacts.length > 0) {
            contact_list.innerHTML = list
        } else {
            contact_list.innerHTML = "<p class='text-center mt-5'>No contacts</p>"
        }
        conversationType = "individual"
    }
    const populateBasicGroupData = async () => {
        const response = await _user.getUserGroups()
        const {obj} = response.data

        let group_list = document.getElementById("list")
        let user_name = document.getElementById("user_name")
        user_name.innerHTML = currentUser.name

        let list = generateListHTML(obj)

        if (obj.length > 0) {
            group_list.innerHTML = list
        } else {
            group_list.innerHTML = "<p class='text-center mt-5'>No Groups</p>"
        }
        conversationType = "group"
    }
    await populateBasicUserData()

    loadDefaultData = async () => {
        await populateBasicUserData()
    }
    loadGroupData = async () => {
        await populateBasicGroupData()
    }


    newMessage=()=>{
        // console.log(conversationType)
        message = $(".message-input input").val()
        socket.emit('new_msg',{sender:currentUser,receiver:receiverId,type:conversationType,text:message})

        if ($.trim(message) === '') {
            return false;
        }
        $('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({scrollTop: $(document).height()}, "fast");
    };

    $('.submit').click(function () {
        newMessage();
    });

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });
    socket.on('new_msg',(data)=>{
        $('<li class="replies"><p>' + data.text + '</p></li>').appendTo($('.messages ul'));
        // $('.message-input input').val(null);
        // $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({scrollTop: $(document).height()}, "fast");
    })
})()
