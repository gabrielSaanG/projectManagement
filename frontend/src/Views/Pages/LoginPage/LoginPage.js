import React, {useContext, useEffect, useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ImageComponent from "../../../Components/ImageComponent/ImageComponent";
import sapiens from '../../../Images/sapiens.png'
import {Login} from "../../../Services/Login/LoginServices";
import InputComponent from "../../../Components/InputComponent/InputComponent";
import AlertsContext, {useAlerts} from "../../../Alerts/alerts-context";
import validateEmail from "../../../Utils/Validations/ValidateEmail";
import ButtonComponent from "../../../Components/ButtonComponent/ButtonComponent";


function LoginPage(){
    const [togglePassword, setTogglePassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors]  = useState({
        emailError: false,
        passwordError: false
    })

    const {addAlert, clearAlerts} = useAlerts()

    useEffect(() => {
        return () => {
            clearAlerts()
        }
    }, []);

    const redirect = () => {
        window.location.href = 'register'
    }

    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateEmail(email)){
            setErrors({
                ...errors, emailError: true
            })
            return
        }
        try{
            const response = await Login(email, password)
            console.log(email, password)

            if (response.status === 401 || response.status === 500){
                console.log("Usuario ou senha invalidos")
                addAlert({severity: "error", message: "Email ou Senha incorretos", timeout: 3})
            }

            if (response.status === 200){
                console.log("Login bem sucedido")
            }
        } catch (e){
            console.log("Erro de login", e)
            addAlert({severity: "error", message: "Email ou Senha incorretos", timeout: 3})

        }

    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-1/2">
                <ImageComponent imageSource={sapiens}/>
            </div>
            <div className="justify-start w-1/4">
                <h1 className="font-bold text-3xl mb-2">Bem-vindo</h1>
                <p className="mb-8">Insira seu email e senha para entrar.</p>

                <form className="flex flex-col gap-8 justify-start" onSubmit={handleSubmit}>

                        {errors.emailError &&
                            <div className="flex items-start border-b-2 border-red-300 ">
                                <p className="text-red-500 ">Email invalido</p>
                            </div>
                        }

                            <InputComponent placeholder="Email" type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (validateEmail(e.target.value)) {
                           setErrors({
                               ...errors, emailError: false
                           })
                    }}}
                    />
                    <div className="flex relative">


                        { !togglePassword ?
                            <>
                                <InputComponent type="password" placeholder="Senha" onChange={(e) => {
                                           setPassword(e.target.value)
                                }}/>
                                <FaEye className="absolute text-2xl right-0 cursor-pointer" onClick={handleTogglePassword}/>
                            </>
                            :
                            <>
                                <InputComponent type="text"
                                       placeholder="Senha" onChange={(e) => {
                                        setPassword(e.target.value)
                                }}/>
                                <FaEyeSlash className="absolute text-2xl right-0 cursos-pointer" onClick={handleTogglePassword}/>
                            </>
                        }

                        {

                        }


                    </div>
                    <ButtonComponent text={"Log in"}/>
                </form>

                <div className="flex justify-center mt-8">
                    <p className="text-gray-800">
                        Não possui uma conta? <a className="font-semibold underline cursor-pointer" onClick={redirect}>Crie uma gratuitamente</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage