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
    profiles: ProfileInterface[]
}

const user: NextPage<Props> = ({ profiles }) => {
    return (
        <div className={styles.pageusercontainer}>
            <Header />
            <Profile profile={profiles[0]} /> 
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:3000/api/profiles`)
    const data = await res.json()
    const profiles = data.data

    return {
        props: {
            profiles: profiles
        }
    }
}

export default user
