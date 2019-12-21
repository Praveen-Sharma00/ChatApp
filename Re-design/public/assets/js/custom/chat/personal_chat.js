
var socket;
(async () => {
    socket = io()
    const _user = new UserData()
    const currentUser = await _user.getCurrentUser()
    var conversationType;
    var receiverId;

    socket.emit('login', currentUser)
    showConversation = async (type, id) => {
        $("li.contact").on('click', function (e) {
            $(this).addClass("active").siblings().removeClass("active")
            $("#tab-name").html($(this).attr("name"))
        })
        let response;
        if (type === "individual") {
            response = await _user.getConversationBetweenUsers(id)
        } else {
            response = await _user.getGroupConversation(id)
        }
        if (!response.success) {
            $('.messages ul').html("")
            $('<li ><p class="mx-auto mt-5">' + response.error.message + '</p></li>').appendTo($('.messages ul'));
            $(".messages").animate({ scrollTop: $(document).height() }, "fast");
        } else {
            $('.messages ul').html("")
            response.data.messages.forEach((msg) => {
                if (msg.sender.id === currentUser._id) {
                    $('<li class="sent"><p>' + msg.text + '</p></li>').appendTo($('.messages ul'));
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
                } else {
                    $('<li class="replies"><p>' + msg.text + '</p></li>').appendTo($('.messages ul'));
                    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
                }
            })
        }

    }
    startConversation = async (id) => {

        receiverId = id
        await showConversation(conversationType, id)
        socket.emit('join', { sender: currentUser, rec_id: id, type: conversationType })
    }
    const generateListHTML = (arr) => {
        let str = ""
        arr.forEach((e) => {
            str += ' <li class="contact " name="' + e.name + '" id="' + e._id + '" onclick="startConversation(this.id)">\n' +
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
        const { data } = await _user.getUserContacts()
        const { contacts } = data

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
        const { obj } = response.data

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


    newMessage = () => {

        message = $(".message-input input").val()
        socket.emit('new_msg', { sender: currentUser, receiver: receiverId, type: conversationType, text: message })

        if ($.trim(message) === '') {
            return false;
        }
        $('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
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
    socket.on('new_msg', (data) => {
        $('<li class="replies"><p>' + data.text + '</p></li>').appendTo($('.messages ul'));
        // $('.message-input input').val(null);
        // $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    })
})()
