async function addContact(){
    const name = document.getElementById('nick_name').value
    const email=document.getElementById('email').value

    if(name===""||email==="")
    {
        return alert("Fill all fields")
    }
    const response = await fetch('http://localhost:3000/contact',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email
        })
    })
    const data = await response.json()
    console.log(data)
    if(data.error){
    //  return alert(data.error)
     return alert(data.msg)
    }else if(data.success){
        email=""
        name=""
        return alert('Contact added')
        
    }
}