import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
// Interfaces
import { ProfileInterface } from '../../interfaces/Profile'
// Styles
import style from './signupform.module.scss'

interface Props {
    formDetails(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string
    ): void
}

const SignupForm: FC<Props> = ({ formDetails }) => {
    const [form, setForm] = useState<ProfileInterface>({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    })

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setForm({...form, [name]: e.target.value})
    }

    const saveInputs = (e: FormEvent) => {
        e.preventDefault()
        formDetails(form.firstName, form.lastName, form.userName, form.email, form.password)
    }
 
    return (
        <div className={style.container}>
            <div className={style.h1}>Sign up</div>
            <form className={style.form} onSubmit={saveInputs}>
                <input 
                    className={style.input}
                    id="firstname" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="Firstname"
                    value={form.firstName}
                    onChange={handleInputs}
                    name="firstName"
                />
                <input 
                    className={style.input}
                    id="lastname" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="Lastname"
                    value={form.lastName}
                    onChange={handleInputs}
                    name="lastName"
                />
                <input 
                    className={style.input}
                    id="username" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="Username"
                    value={form.userName}
                    onChange={handleInputs}
                    name="userName"
                />
                <input 
                    className={style.input}
                    id="email" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputs}
                    name="email"
                />
                <input 
                    className={style.input}
                    id="password" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="Password"
                    value={form.password}
                    onChange={handleInputs}
                    name="password"
                />
                <button className={style.button} type="submit" onClick={saveInputs}>Register</button>
            </form>
         </div>
    )
}

export default SignupForm
