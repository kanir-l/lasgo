import React, { FC } from 'react'
import Image from 'next/image'
// Interfaces
import { ProfileInterface } from '../../interfaces/User'
// Styles
import style from './acknowledgements.module.scss'
import Link from 'next/link'


interface Props {
    user: ProfileInterface
    currentUser: {
        id: number,
        userName: string
    }
    removeAcknowledgement(acknowledgementId: number): void
    editAcknowledgement(acknowledgementId: number, picked: string): void
}

const Acknowledgements: FC<Props> = ( {removeAcknowledgement, editAcknowledgement, user, currentUser} ) => {
    const handleRemove = (acknowledgementId: number) => {
        removeAcknowledgement(acknowledgementId)
    }

    const handleEdit = (acknowledgementId: number, picked: string) => {
        editAcknowledgement(acknowledgementId, picked)
    }

    const renderAcknowledgement = user.myAcknowledgements.map((acknowledgement, index) => { 
        return (
            <div key={index}>
                <div className={style.acknowledgements}>

                {currentUser.userName === user.userName ? 
                /* My profile */
                <>
                    <div className={style.info}>
                        {acknowledgement.picked === acknowledgement.challenge?.challengeThis ? 
                            <button disabled className={style.myPicked}>
                                {acknowledgement.challenge.challengeThis}
                            </button> 
                        :
                            <button className={style.myThis}
                                onClick={() => handleEdit(acknowledgement._id, acknowledgement.challenge.challengeThis)}>
                                {acknowledgement.challenge.challengeThis}
                            </button>
                        }

                        <p className={style.line}>|</p>

                        {acknowledgement.picked === acknowledgement.challenge?.challengeThat ? 
                            <button disabled className={style.myPicked}>
                                {acknowledgement.challenge.challengeThat}
                            </button> 
                        :
                            <button className={style.myThat} 
                                onClick={() => handleEdit(acknowledgement._id, acknowledgement.challenge.challengeThat)}>
                                {acknowledgement.challenge.challengeThat}
                            </button>
                        }
                    </div> 

                    <button className={style.button} type="submit" onClick={() => handleRemove(acknowledgement._id)} >
                        <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
                    </button>

                    <div className={style.byuser}>
                        <Link href={`/profile/${acknowledgement.challenge?.byUser.userName}`} passHref> 
                            <p>By {acknowledgement.challenge.byUser.userName}</p>
                        </Link> 
                    </div>
                </> : 
                /* Other profiles */
                <>
                    <div className={style.info}>
                        {acknowledgement.picked === acknowledgement.challenge.challengeThis ? 
                            <button disabled className={style.picked}>
                                {acknowledgement.challenge.challengeThis}
                            </button> 
                        :
                            <button disabled className={style.this}
                                onClick={() => handleEdit(acknowledgement._id, acknowledgement.challenge.challengeThis)}>
                                {acknowledgement.challenge.challengeThis}
                            </button>
                        }

                        <p className={style.line}>|</p>

                        {acknowledgement.picked === acknowledgement.challenge.challengeThat ? 
                            <button disabled className={style.picked}>
                                {acknowledgement.challenge.challengeThat}
                            </button> 
                        :
                            <button disabled className={style.that} 
                                onClick={() => handleEdit(acknowledgement._id, acknowledgement.challenge.challengeThat)}>
                                {acknowledgement.challenge.challengeThat}
                            </button>
                        }
                    </div> 

                    <div className={style.byuser}>
                        <Link href={`/profile/${acknowledgement.challenge.byUser.userName}`} passHref> 
                            <p>By {acknowledgement.challenge.byUser.userName}</p>
                        </Link> 
                    </div>
                </>
                }
                </div>
            </div>
        )
    })

    return ( <>{renderAcknowledgement.reverse()}</> ) 
}

export default Acknowledgements