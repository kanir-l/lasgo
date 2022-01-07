import React, { FC, FormEvent } from 'react'
import Image from 'next/image'
// Interfaces
import { ChallengeInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    challenges: ChallengeInterface[],
    removeChallenge(challengeId: number): void
 
    acknowledgeChallenge(challengeId: number, pickedChallenge: string): void
}

const Challenges: FC<Props> = ( {challenges, removeChallenge, acknowledgeChallenge} ) => {
    const handleRemove = (challengeId: number) => {
        removeChallenge(challengeId)
    }

    const handleClick = (challengeId: number, pickedChallenge: string) => {
        acknowledgeChallenge(challengeId, pickedChallenge)
    }

    const renderChallenges = challenges.map((challenge, index) => {
        return (
            <div key={index}>
                <div className={style.challenges}>
                    <div className={style.info}>
                        <button className={style.this} onClick={() => handleClick(challenge._id, challenge.challengeThis)}>
                            {challenge.challengeThis}
                        </button>
                            <p className={style.line}>|</p>
                        <button className={style.that} onClick={() => handleClick(challenge._id, challenge.challengeThat)}>
                            {challenge.challengeThat}
                        </button>
                    </div> 

                    <button className={style.button} type="submit" onClick={() => handleRemove(challenge._id)} >
                        <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
                    </button>

                    <div className={style.byuser}>
                        <p>{challenge.byUser}</p>
                        <p>{challenge.created}</p>
                    </div>
                </div>
            </div>
        )
    })   

    return ( <>{renderChallenges.reverse()}</> ) 
}

export default Challenges