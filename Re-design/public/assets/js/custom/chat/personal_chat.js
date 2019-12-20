const _user = new UserData()

const generateListHTML = (arr)=>{
    let str=""
    arr.forEach((e)=>{
        str+=' <li class="contact" id="'+e._id+'">\n' +
            '                    <div class="wrap">\n' +
            '                        <span class="contact-status online"></span>\n' +
            '                        <img src="http://emilcarlsson.se/assets/louislitt.png" alt=""/>\n' +
            '                        <div class="meta">\n' +
            '                            <p class="name">'+e.name+'</p>\n' +
        '                            <!--                            <p class="preview">You just got LITT up, Mike.</p>-->\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </li>'
    })
    return str
}

const populateBasicUserData = async()=>{
    const {data} = await _user.getUserContacts()
    const {contacts} = data
    const user = await _user.getCurrentUser()
    console.log(contacts)
    let contact_list = document.getElementById("list")
    let user_name = document.getElementById("user_name")
        user_name.innerHTML = user.name

    let list = generateListHTML(contacts)

    if(contacts.length >0){
        contact_list.innerHTML=list
    }else{
        contact_list.innerHTML="<p class='text-center mt-5'>No contacts</p>"
    }
}
const populateBasicGroupData = async()=>{
    const response = await _user.getUserGroups()
    const {obj} = response.data
    const user = await _user.getCurrentUser()

    let group_list = document.getElementById("list")
    let user_name = document.getElementById("user_name")
    user_name.innerHTML = user.name

    let list = generateListHTML(obj)

    if(obj.length >0){
        group_list.innerHTML=list
    }
}

(async()=> {
    await populateBasicUserData()
})()

let loadDefaultData = async()=>{
    await populateBasicUserData()
}
let loadGroupData=async ()=>{
    await populateBasicGroupData()
}

