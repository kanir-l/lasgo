import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// Styles
import style from './profile.module.scss'
import { ProfileInterface } from '../../interfaces/Profile'

interface Props {
    profile: ProfileInterface
}

const Profile: FC<Props> = ( {profile} ) => {
    const countChallenges = profile.myChallenges.length
    const countAcknowledgements = profile.myAcknowledgements.length
    
    return (
        <div className={style.profile}>
            <div className={style.box}>
                <div className={style.image}>Image</div>
            </div>
            <div className={style.info}>
                <h1>{profile.userName}</h1>
                <div className={style.activities}>
                    <p>{countChallenges} Challenges</p>
                    <p>{countAcknowledgements} Acknowledgements</p>
                </div>
                <p>{profile.firstName}</p>
                <p>{profile.about}</p>
            </div>
        </div> 
    ) 
}

export default Profile
