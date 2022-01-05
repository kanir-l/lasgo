import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
// Components
import Header from '../../components/Header'
import Profile from '../../components/Profile'
// Services
import { createThisAndThatFromInput, deleteChallengeById, deleteUserProfile, renderProfileByUserName, updateProfileWhenDeletingChallenge } from '../../services/database'
// Interfaces
import { ProfileInterface } from '../../interfaces/Profile'
// Styles
import styles from '../../styles/Home.module.css'
import router from 'next/router'
import Challenges from '../../components/Challenges'
import InputChallenges from '../../components/Challenges/InputChallenges'

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

    const createChallenge = async (challengeThis: string, challengeThat: string, created: Date) => {
        try {
            const thisandthat = await createThisAndThatFromInput(challengeThis, challengeThat, created, user._id)
            if(thisandthat?.ok) {
                router.push(`/profile/${user.userName}`)
            } else {
                if(thisandthat){
                    const response = await thisandthat.json();
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
                <Challenges challenges={user.myChallenges} removeChallenge={deleteChallenge}/>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryUser = String(context.query.profile)

    const res = await renderProfileByUserName(queryUser)
    const data = await res.json()
    const profile = data.data
  
    return {
        props: {
            user: profile[0]
        }
    }
}

export default user
