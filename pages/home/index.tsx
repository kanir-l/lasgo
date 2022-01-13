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
import { AcknowledgementInterface, ChallengeInterface, ProfileInterface } from '../../interfaces/User'
// Styles
import styles from '../../styles/Home.module.css'


interface Props {
    user: ProfileInterface
    currentUser : {
        id: number,
        userName: string
    }
    currentProfile : ProfileInterface
    allChallenges: ChallengeInterface[]
}

const user: NextPage<Props> = ({ allChallenges, user, currentUser, currentProfile }) => {
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

    /* Get all un acknowledged challenges */
    const currentAcknowledgedChallenges = currentProfile.myAcknowledgements.map((acknowledgement) => {
        return acknowledgement.challenge._id
    })
    const renderUnAcknowledgedChallenges = allChallenges.filter((challenge) => {
        return !currentAcknowledgedChallenges.includes(challenge._id)
    }) 

    //TODO : fix to acknowledge the challenges on the home page
    
   return (
        <div className={styles.profilepagecontainer}>
            <Header profile={user} currentUser={currentUser}/>
           
            <div className={styles.challenges}>
                <p>All new/un-acknowledged challenges</p>
                <Challenges 
                    user={user} 
                    currentUser={currentUser}
                    currentProfile={currentProfile}
                    challenges={renderUnAcknowledgedChallenges} 
                    removeChallenge={deleteChallenge} 
                    acknowledgedChallenge={createAcknowledgement}
                />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const currentUserCookie = context.req.cookies.currentUser
    const currentUser = JSON.parse(currentUserCookie)

    const resCurrentUser = await renderProfileByUserName(currentUser.userName)
    const dataCurrentUser = await resCurrentUser?.json()
    const currentProfile = dataCurrentUser.data

    const resAllChallenges = await renderAllChallenges()
    const dataAllChallenges = await resAllChallenges?.json()
    const allChallenges = dataAllChallenges.data
     
    return {
        props: {
            user: "",
            currentUser: currentUser,
            currentProfile: currentProfile[0],
            allChallenges: allChallenges 
        }
    }
}

export default user
