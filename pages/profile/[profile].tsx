import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// Components
import Header from '../../components/Header'
import Profile from '../../components/Profile'
// Services
import { deleteUserProfile, renderProfileByUserName } from '../../services/database'
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
    const deleteUser = async (userId: number) => {
        try {
            await deleteUserProfile(userId)
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }

    const createChallenges = async (challengeA: string, challengeB: string) => {
        console.log(challengeA, challengeB)
        // TODO : POST to api model thisandthat
    }

    const challenges = user.myChallenges.reverse().map((myChallenge) => {
        return (
            <>
                <Challenges challenges={myChallenge}/>
            </>
        )
    })  
    
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
            <InputChallenges challengesDetails={createChallenges} />
            {challenges} 
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
