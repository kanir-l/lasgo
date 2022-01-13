import React, { FC, FormEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
// Interfaces
import { ProfileInterface } from '../../interfaces/User'
// Styles
import style from './header.module.scss'
import { logOutUser } from '../../services/auth'


interface Props {
    profile?: ProfileInterface,
    currentUser: {
        id: number,
        userName: string
    }
}

const Header: FC<Props> = ( {currentUser} ) => {
    const handleSignout = (e: SyntheticEvent) => {
        e.preventDefault()
        logOutUser()
        Router.push("/login")
    }
    return (
        <div className={style.header}>
            <div className={style.logolight}>
                <Link href={`/profile/${currentUser.userName}`} passHref>
                    <Image src="/Lasgo-light.png" alt="Logo" width="145"
                    height="60" />
                </Link>
            </div>
            <div className={style.icons}>
                <Link href={`/home`} passHref>
                    <Image src="/home-icon.png" alt="Logo" width="23"
                    height="23" />
                </Link>
                <Link href={`/profile/${currentUser.userName}`} passHref>
                    <Image src="/user-icon.png" alt="Logo" width="22"
                    height="22" />
                </Link>

                <p className={style.logout} onClick={handleSignout}>Logout</p>
            </div>
        </div> 
    ) 
}

export default Header
