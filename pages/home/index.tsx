import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router from 'next/router'
// Components
import Header from '../../components/Header'
import Challenges from '../../components/Challenges'
// Services
import { 
    createAcknowledgementByPickedChallenge, 
    deleteChallengeById, 
    renderAllChallenges,
    renderProfileByUserName, 
} from '../../services/api'
// Interfaces
import { ChallengeInterface, ProfileInterface } from '../../interfaces/Profile'
import { Error } from '../../interfaces/Error'
// Styles
import styles from '../../styles/Home.module.css'


interface Props {
    allChallenges: ChallengeInterface[]
    user: ProfileInterface
    
}

const user: NextPage<Props> = ({ allChallenges, user }) => {
    // MyChallenges
    const deleteChallenge = async (challengeId: number) => {
        try {
            await deleteChallengeById(challengeId)
            /* router.push(`/profile/${user.userName}`) */
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
                /* router.push(`/profile/${user.userName}`) */
            } else {
                throw "Something went wrong that we couldn't recover from."
            }
        }
        catch (error) {
            console.log(error)
        }
    }
   
    return (
        <div className={styles.profilepagecontainer}>
            <Header profile={user} />
           
            <div className={styles.challenges}>
                <Challenges 
                    challenges={allChallenges} 
                    removeChallenge={deleteChallenge} 
                    acknowledgedChallenge={createAcknowledgement}
                />
            </div>
            
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    /* const queryUser = String(context.query.profile) 

    const resProfile = await renderProfileByUserName(queryUser)
    const dataProfile = await resProfile?.json()
    const profile = dataProfile.data   */

    const resAllChallenges = await renderAllChallenges()
    const dataAllChallenges = await resAllChallenges?.json()
    const allChallenges = dataAllChallenges.data

    return {
        props: {
            /* user: profile[0], */
            allChallenges: allChallenges
        }
    }
}

export default user
