import axios from 'axios'
async function Register(name, email, password){
    const registerData = {
        name: name,
        email: email,
        password: password
    }
    console.log(registerData)
    try{
        const response = await axios.post("http://localhost:8231/api/auth/register", registerData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(response)
        if (response.status === 201){
            console.log("User registered")
        } else {
            console.log("Registration failed")
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


export {Register}
