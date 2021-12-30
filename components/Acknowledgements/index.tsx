import React, { FC } from 'react'
// Interfaces
import { PicksInterface } from '../../interfaces/Profile'
// Styles
/* import style from './profile.module.scss' */


interface Props {
    acknowledgements: PicksInterface,
}

const Acknowledgements: FC<Props> = ( {acknowledgements} ) => {

    return (
        <div className={style.profile}>
          
            <div className={style.info}>
                <div>{acknowledgements.thisAndthat}</div>
            </div>
        </div> 
    ) 
}

export default Acknowledgements