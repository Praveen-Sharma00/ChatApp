function ValidateSignup() {
    let name = document.getElementById("sname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spassword").value;

    if (name === "" || email === "" || password === "") {
        alert('Fill all fields !')
        return false
    }
    return true
}

function ValidateLogin() {
    let email = document.getElementById("lemail").value;
    let password = document.getElementById("lpassword").value;

    if (email === "" || password === "") {
        alert('Fill all fields !')
        return false
    }
    return true;
}

