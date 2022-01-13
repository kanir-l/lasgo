import React, { FC } from 'react'
import Image from 'next/image'
// Interfaces
import { AcknowledgementInterface, ChallengeInterface, ProfileInterface } from '../../interfaces/User'
// Styles
import style from './challenges.module.scss'
import Link from 'next/link'


interface Props {
    user: ProfileInterface
    currentUser: {
        id: number,
        userName: string
    }
    currentProfile?: ProfileInterface
    challenges: ChallengeInterface[]
    removeChallenge(challengeId: number): void
    acknowledgedChallenge(challengeId: number, pickedChallenge: string): void
}

const Challenges: FC<Props> = ( {user, challenges, currentUser, currentProfile, removeChallenge, acknowledgedChallenge} ) => {
    const handleRemove = (challengeId: number) => {
        removeChallenge(challengeId)
    }

    const handlePick = (challengeId: number, pickedChallenge: string) => {
        acknowledgedChallenge(challengeId, pickedChallenge)
    }

    // Making an object for keeping myAcknowledgement id key and a picked string value for the current login profile
    const currentUserAcknowledgedChallenges: any = {}
    currentProfile?.myAcknowledgements.forEach( (acknowledgement: AcknowledgementInterface) => {
        currentUserAcknowledgedChallenges[acknowledgement.challenge._id] = acknowledgement.picked
    }) 

    //TO DO, Change onclick on the user's myChallenges to happen/add to the current user's myAcknowledgements instead

    const renderChallenges = challenges.map((challenge, index) => {
        return (
            <div key={index}>
                <div className={style.challenges}>
                {/* {currentUser.userName === user.userName ?  */}
                
                    <div className={style.info}>
                        {currentUserAcknowledgedChallenges[challenge._id] === challenge.challengeThis ? 
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

                        {currentUserAcknowledgedChallenges[challenge._id] === challenge.challengeThat ? 
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
                        <Link href={`/profile/${challenge.byUser.userName}`} passHref>
                            <p>By {challenge.byUser.userName}</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    })   

    return ( <>{renderChallenges.reverse()}</> ) 
}

export default Challenges