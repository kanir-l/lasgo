import React, { FC, FormEvent } from 'react'
import Image from 'next/image'
// Interfaces
import { AcknowledgementInterface, ChallengeInterface, ProfileInterface } from '../../interfaces/Profile'
// Styles
import style from './challenges.module.scss'


interface Props {
    user?: ProfileInterface

    challenges: ChallengeInterface[],
    removeChallenge(challengeId: number): void
 
    acknowledgedChallenge(challengeId: number, pickedChallenge: string): void
}

const Challenges: FC<Props> = ( {user, challenges, removeChallenge, acknowledgedChallenge} ) => {
    const handleRemove = (challengeId: number) => {
        removeChallenge(challengeId)
    }

    const handlePick = (challengeId: number, pickedChallenge: string) => {
        acknowledgedChallenge(challengeId, pickedChallenge)
    }

    // Making an object for keeping myAcknowledgement id key and a picked string value
    const acknowledgedChallenges: any = {}
    user?.myAcknowledgements.forEach( (acknowledgement: AcknowledgementInterface) => {
        acknowledgedChallenges[acknowledgement.challenge._id] = acknowledgement.picked
    })

    const renderChallenges = challenges.map((challenge, index) => {
        return (
            <div key={index}>
                <div className={style.challenges}>
                    <div className={style.info}>
                        {/* If the acknowledgeChallenge's key which is from "myAcknowledgements -> challenge._id" 
                        that has the string value that from "myAcknowledgements -> picked" 
                        is the same as myChallenges -> challengeThis, then take the className of style.picked */}
                        {acknowledgedChallenges[challenge._id] === challenge.challengeThis ? 
                            <button disabled className={style.picked}>
                                {challenge.challengeThis}
                            </button>
                        : 
                            <button className={style.this} 
                                onClick={() => handlePick(challenge._id, challenge.challengeThis)}>
                                {challenge.challengeThis}
                            </button>
                        }

                        <p className={style.line}>|</p>

                        {acknowledgedChallenges[challenge._id] === challenge.challengeThat ? 
                            <button disabled className={style.picked}>
                                {challenge.challengeThat}
                            </button>
                        : 
                            <button className={style.that} 
                                onClick={() => handlePick(challenge._id, challenge.challengeThat)}>
                                {challenge.challengeThat}
                            </button>
                        }
                    </div> 

                    <button className={style.button} type="submit" onClick={() => handleRemove(challenge._id)} >
                        <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
                    </button>

                    <div className={style.byuser}>
                        <p>{challenge.byUser.userName}</p>
                        <p>{challenge.created}</p>
                    </div>
                </div>
            </div>
        )
    })   

    return ( <>{renderChallenges.reverse()}</> ) 
}

export default Challenges