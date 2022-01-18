import React, { FC, FormEvent, SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
    const router = useRouter()
    
    const handleSignout = (e: SyntheticEvent) => {
        e.preventDefault()
        logOutUser()
        router.push("/login")
    }

    return (
        <div className={style.header}>
            <div className={style.logolight}>
                <Link href={`/profile/${currentUser.userName}`} passHref>
                    <a>
                        <Image src="/Lasgo-light.png" alt="Logo" width="145" height="60" />
                    </a>
                </Link>
            </div>
            <div className={style.icons}>
                <Link href={`/home`} passHref>
                     <a>
                         <div className={router.pathname == "/home" ? style.actives : ""}> 
                            <Image src="/home-icon.png" alt="Logo" width="23" height="23" />
                        </div> 
                    </a>
                </Link>
                <Link href={`/profile/${currentUser.userName}`} passHref>
                    <a>
                        <div className={router.pathname == "/profile/[profile]" ? style.actives : ""}>
                            <Image src="/user-icon.png" alt="Logo" width="22" height="22" />
                        </div>
                    </a>
                </Link>

                <p className={style.logout} onClick={handleSignout}>Logout</p>
            </div>
        </div> 
    ) 
}

export default Header
