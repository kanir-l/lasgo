import React, { FC } from 'react'
import Image from 'next/image'
// Interfaces
import { AcknowledgementInterface } from '../../interfaces/Profile'
// Styles
import style from './acknowledgements.module.scss'


interface Props {
    acknowledgements: AcknowledgementInterface[],
    removeAcknowledgement(acknowledgementId: number): void
    editAcknowledgement(acknowledgementId: number, picked: string): void
}

const Acknowledgements: FC<Props> = ( {acknowledgements, removeAcknowledgement, editAcknowledgement} ) => {
    const handleRemove = (acknowledgementId: number) => {
        removeAcknowledgement(acknowledgementId)
    }

    const handleEdit = (acknowledgementId: number, picked: string) => {
        editAcknowledgement(acknowledgementId, picked)
    }

    const renderAcknowledgement = acknowledgements.map((acknowledgement, index) => { 
        return (
            <div key={index}>
                <div className={style.acknowledgements}>
                    <div className={style.info}>
                        {acknowledgement.picked === acknowledgement.challenge.challengeThis ? 
                            <button disabled className={style.picked}>
                                {acknowledgement.challenge.challengeThis}
                            </button> 
                        :
                            <button className={style.this}
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
                            <button className={style.that} 
                                onClick={() => handleEdit(acknowledgement._id, acknowledgement.challenge.challengeThat)}>
                                {acknowledgement.challenge.challengeThat}
                            </button>
                        }
                    </div> 

                    <button className={style.button} type="submit" onClick={() => handleRemove(acknowledgement._id)} >
                        <Image className={style.image} src="/Remove_fill.png" alt="Logo" width="36" height="36" />
                    </button>

                    <div className={style.byuser}>
                        <p>{acknowledgement.challenge.byUser}</p>
                        <p>{acknowledgement.challenge.created}</p>
                    </div>
                </div>
            </div>
        )
    })

    return ( <>{renderAcknowledgement.reverse()}</> ) 
}

export default Acknowledgements