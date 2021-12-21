import Link from 'next/link'
import React, { FC } from 'react'
// Styles
import style from './button.module.scss'

interface Props {
    title: string
    link: string
}

const Button: FC<Props> = ({ title, link }) => {
    return (
        <Link href={link} data-testid="card-link" passHref>
            <button className={style.button} >
                {title}
            </button>
        </Link>
    )
}

export default Button
