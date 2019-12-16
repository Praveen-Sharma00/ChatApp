(async()=>{
    const response = await fetch('http://localhost:3000/contacts')
    const contacts = await response.json()
    console.log(contacts)
    let ul = document.getElementById("contact-list")
    let str=""
    contacts.forEach((e)=>{
        str+=`<li class="" id="${e._id}">
        <div class="d-flex bd-highlight">
            <div class="img_cont">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img">

            </div>
            <div class="user_info">
                <span>${e.nick_name}</span>

            </div>
        </div>
    </li>`
    })
    ul.innerHTML+=str;
})()