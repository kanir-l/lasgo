import React, { FC } from 'react'
import Image from 'next/image'
// Interfaces
import { ThisAndThatInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    challenges: ThisAndThatInterface,
}

const Challenges: FC<Props> = ( {challenges} ) => {
    return (
        <div className={style.challenges}>
            <div className={style.info}>
                <button className={style.this}>{challenges.this}</button>
                <p className={style.line}>|</p>
                <button className={style.that}>{challenges.that}</button>
            </div>
            <button className={style.button} type="submit" /* onClick={saveInputs} */>
                <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
            </button>
        </div> 
    ) 
}

export default Challenges