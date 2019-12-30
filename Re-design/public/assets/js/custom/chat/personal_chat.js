var socket;
(async () => {
    socket = io()
    const _user = new UserData()
    const currentUser = await _user.getCurrentUser()
    var conversationType;
    var receiverId;
    $(".message-input").css("display", "none")
    $(".contact-profile").css("display", "none")
    socket.emit('login', currentUser)
    scrollToBottom = () => {
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, 0);
    }
    showConversation = async (type, id) => {
        if (type === "group") {
            const _r = await _user.getUserPermissions(id)
            if (_r.data.permissions["ReadOnly"]) {
                $(".message-input").hide()
            } else if (!_r.data.permissions["ReadOnly"]) {
                $(".message-input").show()
                if (!_r.data.permissions["BlockUploads"]) {
                    $(".attachment").removeClass("block")
                } else {
                    $(".attachment").addClass("block")
                }
            }
        } else if (type === "individual") {
            $(".message-input").show()
        }

        $(".contact-profile").show()

        let response;
        if (type === "individual") {
            $(".edit").hide()
            response = await _user.getConversationBetweenUsers(id)
        } else {
            $(".edit").show()
            response = await _user.getGroupConversation(id)
            $(".edit").attr("id", id)
        }

        if (!response.success) {
            $('.messages ul').html("")
            $('<li ><p class="mx-auto mt-5 text-center">' + response.error.message + '</p></li>').appendTo($('.messages ul'));
            scrollToBottom()
        } else {
            $('.messages ul').html("")
            response.data.messages.forEach((msg) => {
                if (msg.sender.id === currentUser._id) {
                    $('<li class="sent"><p>' + msg.text + '</p></li>').appendTo($('.messages ul'));
                    scrollToBottom()
                } else {
                    $('<li class="replies"><p>' + msg.text + '</p></li>').appendTo($('.messages ul'));
                    scrollToBottom()
                }
            })
        }
    }

    startConversation = async (id) => {
        $("li#" + id).addClass("active").siblings().removeClass("active")
        $("#tab-name").html($("li#" + id).attr("name"))

        receiverId = id
        await showConversation(conversationType, id)
        socket.emit('join', { sender: currentUser, rec_id: id, type: conversationType })
    }
    const generateListHTML = (arr) => {
        let str = ""
        arr.forEach((e) => {
            str += ' <li class="contact " name="' + e.name + '" id="' + e._id + '" onclick="startConversation(this.id)">\n' +
                '                    <div class="wrap" id="_' + e._id + '">\n' +
                // '                        <span class="contact-status online"></span>\n' +
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


    $(".tab-btn").click(function (e) {
        $(this).addClass("active-tab").siblings().removeClass("active-tab")
    })
    await populateBasicUserData()

    loadDefaultData = async () => {
        await populateBasicUserData()
    }
    loadGroupData = async () => {
        await populateBasicGroupData()
    }
    tell = async (id) => {
        const response = await _user.getMembersOfGroup(id)
        console.log(response)
    }

    newMessage = () => {

        message = $(".message-input input").val()
        socket.emit('new_msg', { sender: currentUser, receiver: receiverId, type: conversationType, text: message })
        if ($.trim(message) === '') {
            return false;
        }
        $('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        // $('.contact.active .preview').html('<span>You: </span>' + message);
        scrollToBottom()
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
        scrollToBottom()
    })

    upload = async () => {
        // socket.emit('new_msg', {sender: currentUser, receiver: receiverId, type: conversationType, message_type:"media",text: message})
        // if ($.trim(message) === '') {
        //     return false;
        // }
        // $('<li class="sent media"><p>' + message + '</p></li>').appendTo($('.messages ul'));
        // $('.message-input input').val(null);
        // // $('.contact.active .preview').html('<span>You: </span>' + message);
        // scrollToBottom()

        const fileInput = document.getElementById("fileUpload")
        let formData = new FormData();
        let file = fileInput.files[0];
        formData.append("media", file);

        let r=await _user.uploadFile(formData)
        let filename=""
        if(r.success){
            filename=r.filename
            console.log(filename)
        }
        return false
    }
})()

