function ValidateLogin(){

    let email = document.forms["loginForm"]["lemail"].value
    let password = document.forms["loginForm"]["lpassword"].value
    if(password===""||email===""){
        alert("Please fill all fields !")
        return false
    }
    document.getElementById("loginForm").submit()
}

function ValidateSignup(){
    let email = document.forms["signupForm"]["semail"].value
    let password = document.forms["signupForm"]["spassword"].value
    let fname = document.forms["signupForm"]["sfname"].value
    let lname = document.forms["signupForm"]["slname"].value
    if(password===""||email==="" || fname===""||lname===""){
        alert("Please fill all fields !")
        return false
    }
    document.getElementById("signupForm").submit()
}