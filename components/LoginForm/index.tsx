import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
import { ProfileInterface } from '../../interfaces/User'
// Styles
import style from './loginform.module.scss'

interface Props {
    loginDetails(userName: string, password: string): void
}

const LoginForm: FC<Props> = ({ loginDetails }) => {
    const [form, setForm] = useState<ProfileInterface>({} as ProfileInterface)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setForm({...form, [name]: e.target.value})
    }

    const saveInputs = (e: SyntheticEvent) => {
        e.preventDefault()
        loginDetails(form.userName, form.password)
    }
 
    return (
        <div className={style.login}>
            <div className={style.h1}>Log In</div>
            <form className={style.form} onSubmit={saveInputs}>
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
                    id="password" 
                    type="password"  
                    autoComplete="name" 
                    required 
                    placeholder="Password"
                    value={form.password}
                    onChange={handleInputs}
                    name="password"
                />
                <button className={style.button} type="submit" onClick={saveInputs}>Log in</button>
            </form>
         </div>
    )
}

export default LoginForm
