import React, { FC } from 'react'
// Styles
import style from './profile.module.scss'
import { ProfileInterface } from '../../interfaces/Profile'


interface Props {
    profile: ProfileInterface,
    removeProfile(profileId: number): void
}

const Profile: FC<Props> = ( {profile, removeProfile} ) => {

    const countChallenges = profile.myChallenges.length 
    const countAcknowledgements = profile.myAcknowledgements.length 
 
    const handleRemove = (profileId: number) => {
        removeProfile(profileId)
    }
   
    return (
        <div className={style.profile}>
            <div className={style.box}>
                <div className={style.image}>Image</div>
            </div>
            <div className={style.info}>
                <h1>{profile.userName}</h1>
                <div className={style.activities}>
                    {!profile.myChallenges ? 0 : 
                    <p>{countChallenges} Challenges</p>
                    }
                    {!profile.myAcknowledgements ? 0 : 
                    <p>{countAcknowledgements} Acknowledgements</p>
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