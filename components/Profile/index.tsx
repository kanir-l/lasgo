import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Styles
import style from './profile.module.scss'
import { ProfileInterface } from '../../interfaces/Profile'


interface Props {
    profile: ProfileInterface,
    removeProfile(profileId: number): void
}

const Profile: FC<Props> = ( {profile, removeProfile} ) => {

    const countAcknowledgements = profile.myAcknowledgements.length 
    const countChallenges = profile.myChallenges.length 
 
    const handleRemove = (profileId: number) => {
        removeProfile(profileId)
    }
   
    return (
        <div className={style.profile}>
            <div className={style.box}>
                <div className={style.image}>
                    <Image src="/default-image.png" alt="Logo" width="110"
                    height="110" />
                </div>
            </div>
            <div className={style.info}>
                <h1>
                    <Link href={`/profile/${profile.userName}`} passHref>
                        {profile.userName}
                    </Link>
                </h1>
                <div className={style.activities}>
                    {!profile.myAcknowledgements ? 0 : 
                        <Link href={`/profile/${profile.userName}/acknowledgements`} passHref>
                            <a>{countAcknowledgements} Acknowledgements</a>
                        </Link>
                    } 
                    {!profile.myChallenges ? 0 : 
                        <Link href={`/profile/${profile.userName}/challenges`} passHref>
                            <a>{countChallenges} Challenges</a>
                        </Link>
                    }
                </div>
                <p>{profile.firstName}</p>
                <p>{profile.about}</p>
            </div>
            <button className={style.button} onClick={() => handleRemove(profile._id)}>Delete</button>
        </div> 
    ) 
}

export default Profile