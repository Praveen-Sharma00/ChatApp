async function ValidateSignup() {
    let signupForm = document.getElementById('signupForm')

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spassword").value;
    if (fname === '' || lname === '' || email === '' || password === '') {
        alert('Please fill all fields')
        return false;
    }
    let user = {
        name: fname + " " + lname,
        email: email,
        password: password
    }
    console.log(user)
    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json();
    if (json.msg === "done") {
        fname="";
        lname="";
        password="";
        email="";
    }
    return
}

async function ValidateLogin() {

    let email = document.getElementById("lemail").value;
    let password = document.getElementById("lpassword").value;

    if ( email === '' || password === '') {
        alert('Please fill all fields')
        return false;
    }
    let creds = {
        email: email,
        password: password
    }
    console.log(creds)

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json();
    console.log(json);

    if (json.msg === "done") {

        password="";
        email="";
    }
    return
}