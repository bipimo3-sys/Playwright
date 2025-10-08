function login() { 
    const username = document.getElementById("name").value.toString();
    const pass = document.getElementById("password").value.toString();

    if(username && String(username).length > 2 && pass && String(pass).length > 5) {
        alert("Login success")
    } else {
        alert("Username/Password is incorrect")
    }
}