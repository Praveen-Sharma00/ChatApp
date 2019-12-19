(async()=>{
    const data = await fetch('http://localhost:3000/api/v1/user/contacts')
    const response = await  data.json()
    console.log(response)
})()


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
    console.log(response)
}
async function addGroup(){
    let group_name = document.getElementById("group_name").value
    let members = $("#members").val()
    if(group_name === "" || members.length ===0){
        return alert('Fill all fields')
    }
}