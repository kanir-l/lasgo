import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router, { useRouter } from 'next/router'
import Link from 'next/link'
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
    renderProfileByUserName, 
    updateAcknowledgementByIdWithNewPick
} from '../../../../services/api'
// Interfaces
import { ProfileInterface } from '../../../../interfaces/Profile'
import { Error } from '../../../../interfaces/Error'
// Styles
import styles from '../../../../styles/Home.module.css'
import { linkSync } from 'fs'


interface Props {
    user: ProfileInterface
}

const user: NextPage<Props> = ({ user }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState<Error>({
        challengeThis: { message: "" },
        challengeThat: { message: "" }
    })

    // Profile
    const deleteUser = async (userId: number) => {
        try {
            await deleteUserProfile(userId)
            router.push('/')
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
            const acknowledgement = await createAcknowledgementByPickedChallenge(challengeId, pickedChallenge, user._id)
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
            <Header profile={user} />

            <Profile profile={user} removeProfile={deleteUser}/>
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>
                        <Link href={`/profile/${user.userName}/acknowledgements`} passHref>
                            <a className={router.pathname == "/profile/[profile]/acknowledgements" ? styles.active : ""}>
                                My Acknowledgements
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.userName}/challenges`} passHref>
                            <a className={router.pathname == "/profile/[profile]/challenges" ? styles.active : ""}>
                                My Challenges
                            </a>
                        </Link>
                    </li>
                </ul>
            </div> 

            <div className={styles.challenges}>
                <InputChallenges addChallenge={createChallenge} error={errors}/>
                <Challenges 
                    user={user}
                    challenges={user.myChallenges} 
                    removeChallenge={deleteChallenge} 
                    acknowledgedChallenge={createAcknowledgement}
                />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryUser = String(context.query.profile)

    const res = await renderProfileByUserName(queryUser)
    const data = await res?.json()
    const profile = data.data
  
    return {
        props: {
            user: profile[0]
        }
    }
}

export default user
