import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// Components
import Button from '../components/Button'
// Styles
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.pagecontainer}>
      <Head>
        <title>Lasgo</title>
        <meta name="description" content="This or That" />
        <link rel="icon" href="/lasgoicon.png" />
      </Head>

      <div className={styles.logodark}>
        <Link href="/" passHref>
          <a>
            <Image src="/Lasgo-dark.png" alt="Logo" width="185" height="78" />
          </a>
        </Link>
      </div>

      <div className={styles.homecontainer}>
        <div className={styles.h1}>
          <h1>This or That? A simple conversation game that helps understand yourself and others</h1>
        </div>
        <div className={styles.buttons}>
          <Button title="Sign Up" link="/signup" />
          <Button title="Log in" link="/login" />
        </div>
      </div>
    </div>
  )
}

export default Home
