const _user = new UserData()

let generateOptions = async ()=>{
    const response = await _user.getUserContacts()
    const Contacts = response.data.contacts
    let options=""
    Contacts.forEach((c)=>{options+='<option value='+c._id+'>'+c.name+'</option>';
    })
    return options
}
let populateMembers = async()=>{
    const select = document.getElementById("member-select")
    select.innerHTML = '<select class="bg-info" id="members" multiple="multiple">'+await generateOptions()+'</select>'
    $(document).ready(function () {
        $('#members').multiselect({
            buttonText: function (options, select) {
                if (options.length === 0) {
                    return 'Select members';
                } else if (options.length > 4) {
                    return 'More than 3 members selected!';
                }
            }
        });
    });
}

(async()=>await populateMembers())()


async function addContact(){
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    if(name === "" || email === ""){
        return alert('Fill all fields')
    }
    const request  = await  fetch('http://localhost:3000/api/v1/user/contacts',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            email
        })
    })
    const response = await request.json()
    if(response.success){
        alert('Contact added successfully !')
    }
    await populateMembers()
}
async function addGroup(){
    let group_name = document.getElementById("group_name").value
    let members = $("#members").val()
    if(group_name === "" || members.length ===0){
        return alert('Fill all fields')
    }
    const response = await _user.createGroup(group_name,members)
    if(response.success){
        alert('Group created Successfully')
    }else{
        alert(response.error.message)
    }
}