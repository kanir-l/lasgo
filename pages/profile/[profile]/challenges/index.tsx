import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'
// Components
import Header from '../../../../components/Header'
import Profile from '../../../../components/Profile'
import Challenges from '../../../../components/Challenges'
import InputChallenges from '../../../../components/Challenges/InputChallenges'
// Services
import { 
    createAcknowledgementByPickedChallenge, 
    createChallengeFromInput, 
    deleteChallengeById, 
    deleteUserProfile, 
    readAllAcknowledgements, 
    renderProfileByUserName, 
    updateProfileWithImage
} from '../../../../services/user'
// Interfaces
import { 
    AcknowledgementInterface, 
    ProfileInterface 
} from '../../../../interfaces/User'
import { Error } from '../../../../interfaces/Error'
// Styles
import styles from '../../../../styles/Home.module.css'


interface Props {
    user: ProfileInterface
    currentUser: {
        id: number,
        userName: string
    }
    currentProfile: ProfileInterface
    allAcknowledgements: AcknowledgementInterface[]
}

const user: NextPage<Props> = ({ user, currentUser, currentProfile, allAcknowledgements }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState<Error>({
        challengeThis: { message: "" },
        challengeThat: { message: "" }
    })

    // Profile - Delete the profile
    const deleteUser = async (userId: number) => {
        try {
            await deleteUserProfile(userId)
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }
    // Profile - Update with image
    const updateImage = async (file: File) => {
        try {
            await updateProfileWithImage(file, currentUser.id)
            router.push(`/profile/${user.userName}`)
        }
        catch (error) {
            console.log(error)
        }
    }

    // myChallenges
    const createChallenge = async (challengeThis: string, challengeThat: string, created: Date) => {
        try {
            const challenge = await createChallengeFromInput(challengeThis, challengeThat, created, user._id)
            if(challenge?.ok) {
                router.push(`/profile/${user.userName}/challenges`)
            } else {
                if(challenge){
                    const response = await challenge.json();
                    setErrors(response.error.errors)
                } else {
                    throw "Something went wrong that we couldn't recover from."
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteChallenge = async (challengeId: number) => {
        try {
            await deleteChallengeById(challengeId)
            router.push(`/profile/${user.userName}/challenges`)
        }
        catch (error) {
            console.log(error)
        }
    }

    // myAcknowledgements
    const createAcknowledgement = async (challengeId: number, pickedChallenge: string) => {
        try {
            const acknowledgement = await createAcknowledgementByPickedChallenge(challengeId, pickedChallenge, currentUser.id)
            
            if(acknowledgement?.ok) {
                router.push(`/profile/${user.userName}/challenges`)
            } else {
                if(acknowledgement) {
                    const response = await acknowledgement.json();
                    setErrors(response.error.errors)
                } else {
                    throw "Something went wrong that we couldn't recover from."
                }
            } 
        }
        catch (error) {
            console.log(error)
        }
    }
     
    return (
        <div className={styles.profilepagecontainer}>
            <Header currentUser={currentUser}/>

            <Profile 
                profile={user} 
                currentUser={currentUser} 
                removeProfile={deleteUser} 
                uploadImage={updateImage}
            />
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>
                        <Link href={`/profile/${user.userName}/acknowledgements`} passHref>
                            <a className={router.pathname == "/profile/[profile]/acknowledgements" ? styles.activeA : ""}>
                                My Acknowledgements
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.userName}/challenges`} passHref>
                            <a className={router.pathname == "/profile/[profile]/challenges" ? styles.activeC : ""}>
                                My Challenges
                            </a>
                        </Link>
                    </li>
                </ul>
            </div> 

            <div className={styles.challenges}>
                {currentUser.userName === user.userName && 
                    <InputChallenges addChallenge={createChallenge} error={errors}/> 
                }
                <Challenges 
                    user={user}
                    currentUser={currentUser}
                    currentProfile={currentProfile}
                    challenges={user.myChallenges}
                    removeChallenge={deleteChallenge} 
                    acknowledgedChallenge={createAcknowledgement}
                    allAcknowledgements={allAcknowledgements}
                />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const currentUserCookie = context.req.cookies.currentUser
    const currentUser = JSON.parse(currentUserCookie)

    const queryUser = String(context.query.profile)
    const resUser = await renderProfileByUserName(queryUser)
    const dataUser = await resUser?.json()
    const profile = dataUser.data

    const resCurrentUser = await renderProfileByUserName(currentUser.userName)
    const dataCurrentUser = await resCurrentUser?.json()
    const currentProfile = dataCurrentUser.data

    const resAllAcknowledgements = await readAllAcknowledgements()
    const dataAllAcknowledgements = await resAllAcknowledgements?.json()
    const allAcknowledgements = dataAllAcknowledgements.data
  
    return {
        props: {
            user: profile[0],
            currentUser: currentUser,
            currentProfile: currentProfile[0],
            allAcknowledgements: allAcknowledgements
        }
    }
}

export default user

