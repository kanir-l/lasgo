import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
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
    },
    removeProfile(profileId: number): void
    uploadImage(file: File): void
}

const Profile: FC<Props> = ( {profile, currentUser, removeProfile, uploadImage} ) => {
    // Delete profile
    const handleRemove = (profileId: number) => {
        removeProfile(profileId)
    }

    // Update profile by adding image
    const [file, setFile] = useState( "" )
    const [hide, setHide] = useState( true )
    const handleImage = (e: SyntheticEvent) => {
        setFile(e.target.files[0])
        setHide(false)
    }
    const submitImage = (e: SyntheticEvent) => {
        e.preventDefault()
        uploadImage(file)
    } 

    // Count user's myAc and myCh in the profile
    const countAcknowledgements = profile.myAcknowledgements.length 
    const countChallenges = profile.myChallenges.length 
   
    return (
        <div className={style.profile}>
            <div className={style.box}>
                <div className={style.image}>
                    {
                        profile.image && profile.image.length > 0 
                        ? <Image src={profile.image} alt="" layout="fill" objectFit="contain" /> 
                        : <Image src="/default-image.png" alt="Logo" width="80" height="80" />
                    }

                    {currentUser.userName === profile.userName && 
                        <form className={style.form} onSubmit={submitImage}>
                            <input 
                                className={style.customfileinput}
                                type="file" 
                                id='img'
                                name='img'
                                accept='image/jpeg'
                                onChange={handleImage}
                            />
                            {hide 
                                ? <></> 
                                : <button type="submit" onSubmit={submitImage}>
                                    Save</button>}
                        </form>  
                    }   
                </div>
            </div>

            <div className={style.info}>
                <h1>
                    <Link href={`/profile/${profile.userName}`} passHref>
                        <a>{profile.userName}</a>
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

            {currentUser.userName === profile.userName && 
                <button className={style.button} onClick={() => handleRemove(profile._id)}>Delete</button>
            }
        </div> 
    ) 
}

export default Profile