import React, { FC } from 'react'
import Image from 'next/image'
// Interfaces
import { AcknowledgementInterface } from '../../interfaces/Profile'
import Challenge from '../Challenges/Challenge'
// Styles
import style from './acknowledgements.module.scss'
import { Number } from 'mongoose'


interface Props {
    acknowledgements: AcknowledgementInterface[],
    removeAcknowledgement(acknowledgementId: number): void
}

const Acknowledgements: FC<Props> = ( {acknowledgements, removeAcknowledgement} ) => {
    const handleRemove = (acknowledgementId: number) => {
        removeAcknowledgement(acknowledgementId)
    }
   
    const renderAcknowledgement = acknowledgements.map((acknowledgement, index) => { 
        return (
            <div key={index}>
                <div className={style.acknowledgements}>
                    <div className={style.info}>
                        {/* <Challenge challenge={acknowledgement.challenge} /> */}
                        <button className={style.this}>{acknowledgement.challenge.challengeThis}</button>
                            <p className={style.line}>|</p>
                        <button className={style.that}>{acknowledgement.challenge.challengeThat}</button>
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