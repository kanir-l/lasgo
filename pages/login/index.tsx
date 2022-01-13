import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Head from 'next/head'
import router from 'next/router'
// Components
import LoginForm from '../../components/LoginForm'
// Styles
import styles from '../../styles/Home.module.css'
import { logInToProfile } from '../../services/auth'


const Login: NextPage = () => {
    const logIn = (userName: string, password: string) => {
       logInToProfile(userName, password)
       router.push(`/profile/${userName}`)

       console.log(userName, password)
    }

    return (
        <div className={styles.pagecontainer}>
            <Head>
                <title>Lasgo</title>
                <meta name="description" content="This or That" />
                <link rel="icon" href="/lasgoicon.png" />
            </Head>
            
            <div className={styles.logodark}>
                <Link href="/" passHref>
                    <Image src="/Lasgo-dark.png" alt="Logo" width="185"
                    height="78" />
                </Link>
            </div>
            <div className={styles.homecontainer}>
                <LoginForm loginDetails={logIn} />
            </div>
        </div>
    )
}

export default Login
