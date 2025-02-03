import React, {useEffect, useState} from 'react'
import ImageComponent from "../../../Components/ImageComponent/ImageComponent";
import logo from "../../../Images/logo.png"
import InputComponent from "../../../Components/InputComponent/InputComponent";
import ButtonComponent from "../../../Components/ButtonComponent/ButtonComponent";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import validateEmail from "../../../Utils/Validations/ValidateEmail";
import {Register} from "../../../Services/Register/RegisterServices";
import {useAlerts} from "../../../Alerts/alerts-context";

function RegisterPage() {
    const [togglePassword, setTogglePassword] = useState(false)
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const {addAlert, clearAlerts} = useAlerts()

    useEffect(() => {
        return () => {
            clearAlerts()
        }
    }, []);

    const [error, setError] = useState({
        name: '',
        email: false,
        password: '',
        confirmPassword: '',
    })

    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }

    const handleToggleConfirmPassword = () => {
        setToggleConfirmPassword(!toggleConfirmPassword)
    }

    const redirect = () => {
        window.location.href = "/"
    }

    const onInputChange = (e) => {
        const {name, value} = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateEmail(input.email)){
            setError({
                ...error, email: true
            })
            return
        }
        try{
            const response = await Register(input.name, input.email, input.password)

            if (response.status === 401 || response.status === 500){
                console.log("Usuario ou senha invalidos")
                addAlert({severity: "error", message: "Não foi possível completar o cadastro", timeout: 3})
            }

            if (response.status === 201){
                console.log("Login bem sucedido")
                addAlert({severity: "success", message: "Usuário criado com sucesso, você será redirecionado", timeout: 3})
                setTimeout(() => {
                    redirect()
                }, 4000)
            }
        } catch (e){
            console.log("Erro de login", e)
            addAlert({severity: "error", message: "Não foi possível completar o cadastro", timeout: 3})

        }
        }

    const validateInput = (e) => {
        let {name, value} = e.target
        setError((prev) => {
            const stateObj = {...prev, [name]: ''}
            switch (name) {
                case 'name':
                    if (!value) {
                        stateObj[name] = "Insira um usuário"
                    }
                    break
                case 'password':
                    if (!value) {
                        stateObj[name] = "Insira uma senha"
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj['confirmPassword'] = 'Senhas não são iguais'
                    } else {
                        stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword
                    }
                    break
                case 'confirmPassword':
                    if (!value) {
                        stateObj[name] = "Insira a senha novamente"
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = 'Senhas não são iguais'
                    }
                    break
            }
            return stateObj
        })
    }

    return (
        <div className="flex justify-center items-center h-screen mx-20">
            <div className="flex flex-col gap-8 h-fit justify-center border-2 p-10 rounded-2xl shadow-md bg-white">
                <div className="flex flex-col items-center">
                    <div className="h-[60px] mb-20">
                        <ImageComponent imageSource={logo}/>
                    </div>
                    <h1 className="font-bold text-3xl mb-2 text-gray-700">Registre-se</h1>
                    <p className="text-gray-600 mb-3">Para estudantes e funcionários</p>
                </div>
                <div>
                    <form className="flex flex-col gap-10 w-96" onSubmit={handleSubmit}>
                        {error.name && <span className="text-red-500 border-b-2 border-red-400 ">{error.name}</span>}
                        <InputComponent placeholder="Nome" name="name" value={input.name} onChange={onInputChange}
                                        onBlur={validateInput}/>

                        <InputComponent placeholder="Email" name="email" value={input.email} onChange={onInputChange}
                                        onBlur={validateInput}/>


                        <div className="flex relative flex-col">
                            {!togglePassword ?
                                <>
                                    {error.confirmPassword && <span
                                        className="text-red-500 border-b-2 border-red-400 mb-4  ">{error.confirmPassword}</span>}
                                    <InputComponent type="password" name="password" placeholder="Senha"
                                                    value={input.password} onChange={onInputChange}
                                                    onBlur={validateInput}/>
                                    <FaEye className="absolute text-2xl right-0 cursor-pointer opacity-50"
                                                onClick={handleTogglePassword}/>
                                </>
                                :
                                <>
                                    {error.confirmPassword && <span
                                        className="text-red-500 border-b-2 border-red-400 mb-4  ">{error.confirmPassword}</span>}
                                    <InputComponent type="text" name="password" placeholder="Senha"
                                                    value={input.password} onChange={onInputChange}
                                                    onBlur={validateInput}/>
                                    <FaEyeSlash className="absolute text-2xl right-0 cursor-pointer opacity-50"
                                           onClick={handleTogglePassword}/>

                                </>
                            }
                        </div>

                        <div className="flex relative flex-col">
                            {!toggleConfirmPassword ?
                                <>
                                    {error.confirmPassword && <span
                                        className="text-red-500 border-b-2 border-red-400 mb-4  ">{error.confirmPassword}</span>}
                                    <InputComponent type="password" name="confirmPassword" placeholder="Confirmar Senha"
                                                    value={input.confirmPassword} onChange={onInputChange}
                                                    onBlur={validateInput}/>
                                    <FaEye className="absolute text-2xl right-0 cursor-pointer opacity-50"
                                           onClick={handleToggleConfirmPassword}/>


                                </>
                                :
                                <>
                                    {error.confirmPassword && <span
                                        className="text-red-500 border-b-2 border-red-400 mb-4  ">{error.confirmPassword}</span>}
                                    <InputComponent type="text" name="confirmPassword" placeholder="Confirmar Senha"
                                                    value={input.confirmPassword} onChange={onInputChange}
                                                    onBlur={validateInput}/>
                                    <FaEyeSlash className="absolute text-2xl right-0 cursor-pointer opacity-50"
                                                onClick={handleToggleConfirmPassword}/>
                                </>
                            }
                        </div>

                        <ButtonComponent text={"Registrar"}/>
                    </form>

                    <div>
                        <p className="text-gray-700 mt-4">Já é um usuário? <a
                            className="underline font-semibold cursor-pointer" onClick={redirect} href="/">Entrar agora</a></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage