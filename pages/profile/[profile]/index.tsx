import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router from 'next/router'
import Link from 'next/link'

// Components
import Header from '../../../components/Header'
import Profile from '../../../components/Profile'
import Acknowledgements from '../../../components/Acknowledgements'
// Services
import { 
    deleteAcknowledgementById, 
    deleteUserProfile, 
    renderProfileByUserName, 
    updateAcknowledgementByIdWithNewPick
} from '../../../services/user'
// Interfaces
import { ProfileInterface } from '../../../interfaces/Profile'
import { Error } from '../../../interfaces/Error'
// Styles
import styles from '../../../styles/Home.module.css'


interface Props {
    user: ProfileInterface,
    currentUser: {
        id: number, 
        userName: string
    }
}

const user: NextPage<Props> = ({ user, currentUser }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState<Error>({
        challengeThis: { message: "" },
        challengeThat: { message: "" }
    })

    // User/Profile
    const deleteUser = async (userId: number) => {
        try {
            await deleteUserProfile(userId)
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }

    // myAcknowledgements
    const deleteAcknowledgement = async (acknowledgementId: number) => {
        try {
            await deleteAcknowledgementById(acknowledgementId)
            router.push(`/profile/${user.userName}`)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateAcknowledgement = async (acknowledgementId: number, picked: string) => {
        try {
            await updateAcknowledgementByIdWithNewPick(acknowledgementId, picked)
            router.push(`/profile/${user.userName}`)
        }
        catch (error) {
            console.log(error)
        }
    }
     
    return (
        <div className={styles.profilepagecontainer}>
            <Header profile={user} currentUser={currentUser}/>
            
            <Profile profile={user} removeProfile={deleteUser}/>
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>
                        <Link href={`/profile/${user.userName}/acknowledgements`} passHref>
                            My Acknowledgements
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.userName}/challenges`} passHref>
                            My Challenges
                        </Link>
                    </li>
                </ul>
            </div> 
            <div className={styles.acknowledgements}>
                <Acknowledgements 
                    /* acknowledgements={user.myAcknowledgements} */ 
                    removeAcknowledgement={deleteAcknowledgement}
                    editAcknowledgement={updateAcknowledgement}
                    user={user}
                    currentUser={currentUser}
                /> 
                {/* .filter((acknowledgement) => (acknowledgement.challenge.byUser !== user._id)) */}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
      // if there is no current user, redirect to login page
    // if there is a user, include it in the props
    const currentUserCookie = context.req.cookies.currentUser
    const currentUser = JSON.parse(currentUserCookie)
    const queryUser = String(context.query.profile)

    const res = await renderProfileByUserName(queryUser)
    const data = await res?.json()
    const profile = data.data
  
    return {
        props: {
            user: profile[0],
            currentUser: currentUser
        }
    }
}

export default user
