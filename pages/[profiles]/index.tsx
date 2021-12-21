import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
// Components

// Styles
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import UserProfile from '../../components/UserProfile'


const user: NextPage = () => {
    
    return (
        <div className={styles.pageusercontainer}>
            <Header />
            <UserProfile /> 
        </div>
    )
}

export default user
