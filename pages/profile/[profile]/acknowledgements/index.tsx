import type { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import router, { useRouter } from 'next/router'
import Link from 'next/link'
// Components
import Header from '../../../../components/Header'
import Profile from '../../../../components/Profile'
import Acknowledgements from '../../../../components/Acknowledgements'
// Services
import { 
    deleteAcknowledgementById, 
    deleteUserProfile, 
    readAllAcknowledgements, 
    renderProfileByUserName, 
    updateAcknowledgementByIdWithNewPick
} from '../../../../services/user'
// Interfaces
import { Error } from '../../../../interfaces/Error'
import { AcknowledgementInterface, ProfileInterface } from '../../../../interfaces/User'
// Styles
import styles from '../../../../styles/Home.module.css'


interface Props {
    user: ProfileInterface
    currentUser: {
        id: number,
        userName: string
    }
    allAcknowledgements: AcknowledgementInterface[]
}

const user: NextPage<Props> = ({ user, currentUser, allAcknowledgements }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

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

    // myAcknowledgements
    const deleteAcknowledgement = async (acknowledgementId: number) => {
        try {
            await deleteAcknowledgementById(acknowledgementId)
            router.push(`/profile/${user.userName}/acknowledgements`)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateAcknowledgement = async (acknowledgementId: number, picked: string) => {
        try {
            await updateAcknowledgementByIdWithNewPick(acknowledgementId, picked)
            router.push(`/profile/${user.userName}/acknowledgements`)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.profilepagecontainer}>
            <Header currentUser={currentUser}/>

            <Profile profile={user} currentUser={currentUser} removeProfile={deleteUser}/>
           
            <div className={styles.topiccontainer}>
                <ul>
                    <li>
                        <Link href={`/profile/${user.userName}/acknowledgements`} passHref>
                            <a className={router.pathname == "/profile/[profile]/acknowledgements" ? styles.activeA : ""}>
                                My Acknowledgements
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${user.userName}/challenges`} passHref>
                            <a className={router.pathname == "/profile/[profile]/challenges" ? styles.activeA : ""}>
                                My Challenges
                            </a>
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
    const currentUser = JSON.parse(currentUserCookie)

    const queryUser = String(context.query.profile)
    const resUser = await renderProfileByUserName(queryUser)
    const dataUser = await resUser?.json()
    const profile = dataUser.data

    const resAllAcknowledgements = await readAllAcknowledgements()
    const dataAllAcknowledgements = await resAllAcknowledgements?.json()
    const allAcknowledgements = dataAllAcknowledgements.data
  
    return {
        props: {
            user: profile[0],
            currentUser: currentUser,
            allAcknowledgements: allAcknowledgements
        }
    }
}

export default user
