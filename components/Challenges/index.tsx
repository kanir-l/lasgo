import React, { FC } from 'react'
// Interfaces
import { ThisAndThatInterface } from '../../interfaces/Profile'
// Styles
/* import style from './profile.module.scss' */


interface Props {
    challenges: ThisAndThatInterface,
}

const Challenges: FC<Props> = ( {challenges} ) => {
    return (
        <div className={style.profile}>
            <div className={style.info}>
                <button>{challenges.this}</button>
                <button>{challenges.that}</button>
            </div>
        </div> 
    ) 
}

export default Challenges