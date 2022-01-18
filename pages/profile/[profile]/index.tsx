import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router from 'next/router'
import Link from 'next/link'
import Error from '../../_error'
// Components
import Header from '../../../components/Header'
import Profile from '../../../components/Profile'
import Acknowledgements from '../../../components/Acknowledgements'
// Services
import { 
    deleteAcknowledgementById, 
    deleteUserProfile, 
    readAllAcknowledgements, 
    renderProfileByUserName, 
    updateAcknowledgementByIdWithNewPick
} from '../../../services/user'
// Interfaces
import { AcknowledgementInterface, ProfileInterface } from '../../../interfaces/User'
// Styles
import styles from '../../../styles/Home.module.css'


interface Props {
    user: ProfileInterface,
    currentUser: {
        id: number, 
        userName: string
    }
    allAcknowledgements: AcknowledgementInterface[]
}

const user: NextPage<Props> = ({ user, currentUser, allAcknowledgements }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errors, setErrors] = useState<Error>({
        challengeThis: { message: "" },
        challengeThat: { message: "" }
    }) 

    if (!user) {
        return <Error statusCode={404} />;
    }
 
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
            
            <Profile profile={user} currentUser={currentUser} removeProfile={deleteUser}/>
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>
                        <Link href={`/profile/${user.userName}/acknowledgements`} passHref>
                            <a>My Acknowledgements</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.userName}/challenges`} passHref>
                            <a>My Challenges</a>
                        </Link>
                    </li>
                </ul>
            </div> 
            <div className={styles.acknowledgements}>
                <Acknowledgements 
                    user={user}
                    currentUser={currentUser}
                    removeAcknowledgement={deleteAcknowledgement}
                    editAcknowledgement={updateAcknowledgement}
                    allAcknowledgements={allAcknowledgements}
                /> 
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
  
    const queryUser = String(context.query.profile)
    const resUser = await renderProfileByUserName(queryUser)
    const dataUser = await resUser?.json()
    let profile = dataUser.data
    if(!profile) {
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
            user: profile[0],
            currentUser: currentUser,
            allAcknowledgements: allAcknowledgements
        }
    }
}

export default user
