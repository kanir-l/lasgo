import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Interfaces
import { ProfileInterface } from '../../interfaces/User'
// Styles
import style from './profile.module.scss'



interface Props {
    profile: ProfileInterface,
    currentUser: {
        id: number,
        userName: string
    }
    removeProfile(profileId: number): void
}

const Profile: FC<Props> = ( {profile, currentUser, removeProfile} ) => {

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
                <p>{profile.firstName}&nbsp;{profile.lastName}</p>
                <p>{profile.about}</p>
            </div>
            {currentUser.userName === profile.userName ? 
                <button className={style.button} onClick={() => handleRemove(profile._id)}>Delete</button> :
                null
            }
        </div> 
    ) 
}

export default Profile