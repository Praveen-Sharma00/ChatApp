(async () => {
    const generateOptions = (arr) => {
        let str = "";
        arr.forEach((e) => {
            str += '<option value="' + e._id + '">' + e.nick_name + '</option>'
        })
        return str;
    }
    const response = await fetch('http://localhost:3000/contacts')
    const contacts = await response.json()
    console.log(contacts)

    if (contacts.length > 0) {

        var options = generateOptions(contacts);
        var select = '<select class="form-control members bg-info" id="example-getting-started" multiple="multiple">' + options + '</select>';
        document.getElementById("member_select").innerHTML += select;
    }
    $(document).ready(function () {
        $('#example-getting-started').multiselect();
    });
})()


async function addGroup() {
    // var members = $('#example-getting-started').val();
    var members = $('#example-getting-started').val();
    var name = $('#group_name').val()
    if(members.length ===0 || name ===''){
        return alert('Fill all fields')
    }
    const response = await fetch('http://localhost:3000/group', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            members: members
        })
    })
    const data = await response.json()
    console.log(data)
    if (data.error) {
        return alert(data.msg)
    } else if (data.success) {
        name=""
        members=""
        return alert('Group created')
    }
}
async function addContact() {
    const name = document.getElementById('nick_name').value
    const email = document.getElementById('email').value

    if (name === "" || email === "") {
        return alert("Fill all fields")
    }
    const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
    const data = await response.json()
    console.log(data)
    if (data.error) {
        //  return alert(data.error)
        return alert(data.msg)
    } else if (data.success) {
        email = ""
        name = ""
        return alert('Contact added')
    }
}
