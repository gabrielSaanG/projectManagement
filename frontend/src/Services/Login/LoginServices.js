import axios from 'axios'
async function Login(email, password){
    const loginData = {
        email: email,
        password: password
    }

    try{
        const response = await axios.post("http://localhost:8231/api/auth/login", loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", loginData.email)

        if (response.status === 200){
            console.log("User logged in")
            // window.location.href("user/main")
        } else {
            console.log("Log in failed")
        }

        return response;

    } catch (e) {
        if (e.response && e.response.status === 401){
            console.log("Error 401: Unauthorized user")
        } else {
            console.log("Solicitation error", e)
        }
    }
}

async function Logout(){
    localStorage.clear();
    window.location.href("/login")
}

export {Login, Logout}
