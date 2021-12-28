import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// Components
import Header from '../../components/Header'
import Profile from '../../components/Profile'
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
            <Profile profile={user} /> 
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryUser = String(context.query.profiles)

    const res = await fetch(`http://localhost:3000/api/${queryUser}`)
    const data = await res.json()
    const profile = data.data

    console.log(profile)
 
    return {
        props: {
            user: profile[0]
        }
    }
}

export default user
