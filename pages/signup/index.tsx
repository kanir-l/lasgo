import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import router from 'next/router'
// Components
import SignupForm from '../../components/SignupForm'
// Services
import { createProfileFromSignUp } from '../../services/user'
// Styles
import styles from '../../styles/Home.module.css'


const Signup: NextPage = () => {
    const [errors, setErrors] = useState({
        firstName: { message: "" },
        lastName: { message: "" },
        userName: { message: "" },
        email: { message: "" },
        password: { message: "" }
    })

    const createUser = async (firstName: string, lastName: string, userName: string, email: string, password: string, accountCreated: Date) => {
        try {
            const signUp = await createProfileFromSignUp(firstName, lastName, userName, email, password, accountCreated)
            if(signUp?.ok) {
                router.push(`/profile/login`)
            } else {
                if(signUp){
                    const response = await signUp.json();
                    setErrors(response.error.errors)
                } else {
                    throw "Something went wrong that we couldn't recover from."
                }
            }
        }
        catch (error) {
            console.log(error)
        }
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
                <SignupForm addForm={createUser} errors={errors} />
            </div>
        </div>
    )
}

export default Signup