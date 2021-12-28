import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// Components
import Header from '../../components/Header'
import Profile from '../../components/Profile'
// Services
import { renderProfileByUserName } from '../../services/database'
// Interfaces
import { ProfileInterface } from '../../interfaces/Profile'
// Styles
import styles from '../../styles/Home.module.css'

interface Props {
    user: ProfileInterface
}

const user: NextPage<Props> = ({ user }) => {
    return (
        <div className={styles.pageusercontainer}>
            <Header />
            {user 
            ?<Profile profile={user} />
            :null
            } 
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
