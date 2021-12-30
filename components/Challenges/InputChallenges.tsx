import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import Image from 'next/image'
// Interfaces
import { ThisAndThatInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    challengesDetails(challengeA: String, challengeB: String) :void
}

const InputChallenges: FC<Props> = ( {challengesDetails} ) => {
    const [form, setForm] = useState<ThisAndThatInterface>({
        this: "",
        that: ""
    })

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setForm({...form, [name]: e.target.value})
    }

    const saveInputs = (e: FormEvent) => {
        e.preventDefault()
        challengesDetails(form.this, form.that)
    }
    
    return (
        <div className={style.thisandthat}>
            <form className={style.form} onSubmit={saveInputs}>
                <input 
                    className={style.input}
                    id="this" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="This"
                    value={form.this}
                    onChange={handleInputs}
                    name="this"
                />
                <p className={style.line}>|</p>
                <input 
                    className={style.input}
                    id="that" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="That"
                    value={form.that}
                    onChange={handleInputs}
                    name="that"
                />
            </form>
            <button className={style.button} type="submit" onClick={saveInputs}>
                    <Image className={style.image} src="/Add_round_fill.png" alt="Logo" width="36" height="36" />
            </button>
        </div> 
    ) 
}

export default InputChallenges