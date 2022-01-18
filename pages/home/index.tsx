import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// Components
import Header from '../../components/Header'
import Challenges from '../../components/Challenges'
// Services
import { 
    createAcknowledgementByPickedChallenge, 
    deleteChallengeById, 
    deleteUserProfile, 
    readAllAcknowledgements, 
    renderAllChallenges,
    renderProfileByUserName
} from '../../services/user'
// Interfaces
import { AcknowledgementInterface, ChallengeInterface, ProfileInterface } from '../../interfaces/User'
// Styles
import styles from '../../styles/Home.module.css'
import router from 'next/router'


interface Props {
    user: ProfileInterface
    currentUser : {
        id: number,
        userName: string
    }
    currentProfile : ProfileInterface
    allChallenges: ChallengeInterface[]
    allAcknowledgements: AcknowledgementInterface[]
}

const user: NextPage<Props> = ({ user, currentUser, currentProfile, allChallenges, allAcknowledgements }) => {
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
            const acknowledgement = await createAcknowledgementByPickedChallenge(challengeId, pickedChallenge, currentUser.id)
            if(acknowledgement?.ok) {
                router.push(`/home`) 
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

   return (
        <div className={styles.profilepagecontainer}>
            <Header currentUser={currentUser} />

            <div className={styles.challenges}>
                <p>All new challenges</p>
                {renderUnAcknowledgedChallenges.length === 0 ? <i>No more new challenges </i> : 
                    <Challenges 
                        user={user} 
                        currentUser={currentUser}
                        currentProfile={currentProfile}
                        challenges={renderUnAcknowledgedChallenges} 
                        removeChallenge={deleteChallenge} 
                        acknowledgedChallenge={createAcknowledgement}
                        allAcknowledgements={allAcknowledgements}
                    />
                }
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const currentUserCookie = context.req.cookies.currentUser
    if(!currentUserCookie) {
        return {
            notFound: true
        }
    }
    const currentUser = JSON.parse(currentUserCookie)

    const resCurrentUser = await renderProfileByUserName(currentUser.userName)
    const dataCurrentUser = await resCurrentUser?.json()
    const currentProfile = dataCurrentUser?.data

    const resAllChallenges = await renderAllChallenges()
    const dataAllChallenges = await resAllChallenges?.json()
    const allChallenges = dataAllChallenges?.data
    if(!allChallenges) {
        return {
            notFound: true
        }
    }

    const resAllAcknowledgements = await readAllAcknowledgements()
    const dataAllAcknowledgements = await resAllAcknowledgements?.json()
    const allAcknowledgements = dataAllAcknowledgements.data
    if(!allAcknowledgements) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user: "",
            currentUser: currentUser,
            currentProfile: currentProfile[0],
            allChallenges: allChallenges,
            allAcknowledgements: allAcknowledgements
        }
    }
}

export default user
