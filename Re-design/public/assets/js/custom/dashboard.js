(async()=>{
    const data = await fetch('http://localhost:3000/api/v1/contact/all')
    const response = await  data.json()
    console.log(response)
})()



async function ValidateAddContactForm(){
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    if(name === "" || email === ""){
        return alert('Fill all fields')
    }
}
async function ValidateAddGroupForm(){
    let group_name = document.getElementById("group_name").value
    let members = $("#members").val()
    if(group_name === "" || members.length ===0){
        return alert('Fill all fields')
    }
}