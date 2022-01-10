import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import Image from 'next/image'
// Interfaces
import { ChallengeInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    addChallenge(challengeThis: String, challengeThat: String, created: Date) :void
    error: Object
}

const InputChallenges: FC<Props> = ( {addChallenge} ) => {
    const [form, setForm] = useState<ChallengeInterface>({
        _id: 0,
        challengeThis: "",
        challengeThat: "",
        created: new Date(),
        byUser: 0
    })

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        setForm({...form, [name]: e.target.value})
    }

    const saveInputs = (e: FormEvent) => {
        e.preventDefault()
        addChallenge(form.challengeThis, form.challengeThat, form.created)
    }
    
    return (
        <div className={style.thisandthat}>
            <form className={style.form} onSubmit={saveInputs}>
                <input 
                    className={style.input}
                    id="challengeThis" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="This"
                    value={form.challengeThis}
                    onChange={handleInputs}
                    name="challengeThis"
                />
                <p className={style.line}>|</p>
                <input 
                    className={style.input}
                    id="challengeThat" 
                    type="text" 
                    autoComplete="name" 
                    required 
                    placeholder="That"
                    value={form.challengeThat}
                    onChange={handleInputs}
                    name="challengeThat"
                />
            </form>

            <button className={style.button} type="submit" onClick={saveInputs}>
                <Image className={style.image} src="/Add_round_fill.png" alt="Logo" width="36" height="36" />
            </button>
        </div> 
    ) 
}

export default InputChallenges