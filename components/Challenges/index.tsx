import React, { FC, FormEvent } from 'react'
import Image from 'next/image'
// Interfaces
import { ThisAndThatInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    challenges: ThisAndThatInterface[],
    removeChallenge(challengeId: number): void
}

const Challenges: FC<Props> = ( {challenges, removeChallenge} ) => {
    const handleRemove = (challengeId: number) => {
        removeChallenge(challengeId)
    }

    const renderChallenge = challenges.reverse().map((challenge, index) => {
        return (
            <>
                <div className={style.challenges} >
                    <div className={style.info}>
                        <button className={style.this}>{challenge.challengeThis}</button>
                            <p className={style.line}>|</p>
                        <button className={style.that}>{challenge.challengeThat}</button>
                    </div> 

                    <button className={style.button} type="submit" onClick={() => handleRemove(challenge._id)} >
                        <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
                    </button>
                </div>
            </>
        )
    })   

    return ( <>{renderChallenge}</> ) 
}

export default Challenges