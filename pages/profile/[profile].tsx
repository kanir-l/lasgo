import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router from 'next/router'
// Components
import Header from '../../components/Header'
import Profile from '../../components/Profile'
import Challenges from '../../components/Challenges'
import InputChallenges from '../../components/Challenges/InputChallenges'
import Acknowledgements from '../../components/Acknowledgements'
// Services
import { 
    createAcknowledgementByPickedChallenge, 
    createChallengeFromInput, 
    deleteAcknowledgementById, 
    deleteChallengeById, 
    deleteUserProfile, 
    renderProfileByUserName 
} from '../../services/api'
// Interfaces
import { ProfileInterface } from '../../interfaces/Profile'
// Styles
import styles from '../../styles/Home.module.css'


interface Props {
    user: ProfileInterface
}

const user: NextPage<Props> = ({ user }) => {
    const [errors, setErrors] = useState({
        this: { message: "" },
        that: { message: "" }
    })

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
                router.push(`/profile/${user.userName}`)
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
            router.push(`/profile/${user.userName}`)
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
                router.push(`/profile/${user.userName}`)
            } else {
                if(acknowledgement){
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

    const deleteAcknowledgement = async (acknowledgementId: number) => {
        try {
            await deleteAcknowledgementById(acknowledgementId)
            router.push(`/profile/${user.userName}`)
        }
        catch (error) {
            console.log(error)
        }
    }
     
    return (
        <div className={styles.profilepagecontainer}>
            <Header />

            <Profile profile={user} removeProfile={deleteUser}/>
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>My Challenges</li>
                    <li>My Acknowledgements</li>
                </ul>
            </div>
            
            <div className={styles.challenges}>
                <InputChallenges addChallenge={createChallenge} />
                <Challenges 
                    challenges={user.myChallenges} 
                    removeChallenge={deleteChallenge} 
                    byUser={user.userName}
                    acknowledgeChallenge={createAcknowledgement}/>
            </div>

            <div className={styles.acknowledgements}>
                <Acknowledgements acknowledgements={user.myAcknowledgements} removeAcknowledgement={deleteAcknowledgement}/> 
                    {/* .filter((acknowledgement) => (acknowledgement.challenge.byUser !== user._id)) */}
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
