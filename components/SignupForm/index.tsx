import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
// Interfaces
import { SignUpInterface } from '../../interfaces/Profile'
// Styles
import style from './signupform.module.scss'

interface Props {
    addForm(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string,
        accountCreated: Date
    ): void
    errors: {
        firstName: { message: string },
        lastName: { message: string },
        userName: { message: string },
        email: { message: string },
        password: { message: string }
    }
}

const SignupForm: FC<Props> = ( {addForm, errors} ) => {
    const [form, setForm] = useState<SignUpInterface>({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        accountCreated: new Date()
    })

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setForm({...form, [name]: e.target.value})
    }

    const saveInputs = (e: FormEvent) => {
        e.preventDefault()
        addForm(form.firstName, form.lastName, form.userName, form.email, form.password, new Date())
    }
 
    return (
        <div className={style.signup}>
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
                {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
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
                {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
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
                {errors.userName && <p className='error'>{errors.userName.message}</p>}
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
                {errors.email && <p className='error'>{errors.email.message}</p>}
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
                {errors.password && <p className='error'>{errors.password.message}</p>}
                <button className={style.button} type="submit" onClick={saveInputs}>Register</button>
            </form>
         </div>
    )
}

export default SignupForm
