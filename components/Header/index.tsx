import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// Styles
import style from './header.module.scss'


const Header: FC = () => {
    return (
        <div className={style.header}>
            <div className={style.logolight}>
                <Link href="/" passHref>
                    <Image src="/Lasgo-light.png" alt="Logo" width="93"
                    height="38" />
                </Link>
            </div>
            <div className={style.icons}>
                <Link href={`/home`} passHref>
                    <Image src="/home-icon.png" alt="Logo" width="26"
                    height="26" />
                </Link>
                <Link href={`/profiles`} passHref>
                    <Image src="/user-icon.png" alt="Logo" width="26"
                    height="26" />
                </Link>
                <Link href={`/logout`} passHref>
                    <p className={style.logout}>Logout</p>
                </Link>
            </div>
        </div> 
    ) 
}

export default Header
