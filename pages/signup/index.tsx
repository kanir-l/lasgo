import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
// Components
import SignupForm from '../../components/SignupForm'
// Styles
import styles from '../../styles/Home.module.css'


const Signup: NextPage = () => {
    const createUser = (firstName: string, lastName: string, userName: string, email: string, password: string) => {
        console.log(firstName, lastName, userName, email, password)
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
                <SignupForm formDetails={createUser}/>
            </div>
        </div>
    )
}

export default Signup