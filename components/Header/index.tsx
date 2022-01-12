import React, { FC, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
// Interfaces
import { ProfileInterface } from '../../interfaces/Profile'
// Styles
import style from './header.module.scss'


interface Props {
    profile?: ProfileInterface,
    currentUser: {
        id: number,
        userName: string
    }
}

const Header: FC<Props> = ( {profile, currentUser} ) => {
    const handleSignout = (e: FormEvent) => {
        e.preventDefault()
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
                    <Image src="/home-icon.png" alt="Logo" width="26"
                    height="26" />
                </Link>
                <Link href={`/profile/${currentUser.userName}`} passHref>
                    <Image src="/user-icon.png" alt="Logo" width="26"
                    height="26" />
                </Link>

                <p className={style.logout} onClick={handleSignout}>Logout</p>
            </div>
        </div> 
    ) 
}

export default Header
