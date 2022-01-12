import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// Components
import Header from '../../components/Header'
import Challenges from '../../components/Challenges'
// Services
import { 
    createAcknowledgementByPickedChallenge, 
    deleteChallengeById, 
    renderAllChallenges,
    renderProfileByUserName
} from '../../services/user'
// Interfaces
import { ChallengeInterface, ProfileInterface } from '../../interfaces/Profile'
// Styles
import styles from '../../styles/Home.module.css'


interface Props {
    allChallenges: ChallengeInterface[]
    user: ProfileInterface
    currentUser : {
        id: number,
        userName: string
    }
}

const user: NextPage<Props> = ({ allChallenges, user, currentUser }) => {
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
            <Header profile={user} currentUser={currentUser}/>
           
            <div className={styles.challenges}>
                <Challenges 
                    user={user}
                    currentUser={currentUser}
                    challenges={allChallenges} 
                    removeChallenge={deleteChallenge} 
                    acknowledgedChallenge={createAcknowledgement}
                />
            </div>
            
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryUser = String(context.query.profile)
    const resUser = await renderProfileByUserName(queryUser)
    const dataUser = await resUser?.json()
    const profile = dataUser.data

    const currentUserCookie = context.req.cookies.currentUser
    const currentUser = JSON.parse(currentUserCookie)

    const resAllChallenges = await renderAllChallenges()
    const dataAllChallenges = await resAllChallenges?.json()
    const allChallenges = dataAllChallenges.data
    return {
        props: {
            user: profile[0],
            currentUser: currentUser,
            allChallenges: allChallenges
        }
    }
}

export default user
