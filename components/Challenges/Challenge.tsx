import React, { FC, FormEvent } from 'react'
import Image from 'next/image'
// Interfaces
import { ChallengeInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    challenge: ChallengeInterface
}

const Challenge: FC<Props> = ( {challenge} ) => {
        return (
            <div>
                <div className={style.challenges}>
                    <div className={style.info}>
                        <button className={style.this}>{challenge.challengeThis}</button>
                            <p className={style.line}>|</p>
                        <button className={style.that}>{challenge.challengeThat}</button>
                    </div> 

                    <div className={style.byuser}>
                        <p>{challenge.byUser}</p>
                        <p>{challenge.created}</p>
                    </div>
                </div>
            </div>
        )
}

export default Challenge