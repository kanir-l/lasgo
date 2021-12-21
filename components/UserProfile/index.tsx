import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// Styles
import style from './userprofile.module.scss'

interface Props {

}

const UserProfile: FC<Props> = () => {
    return (
        <div className={style.profile}>
            <div className={style.box}>
                <div className={style.image}>Image</div>
            </div>
            <div className={style.info}>
                <h1>JJDD</h1>
                <div className={style.activities}>
                    <p>123 challenges</p>
                    <p>211 acknowledgements</p>
                </div>
                <p>John Doe</p>
                <p>I am a person who loves social medias, games, and all types of music. I also spend time playing sports</p>
            </div>
        </div> 
    ) 
}

export default UserProfile
