import type { NextApiRequest, NextApiResponse } from 'next'
// Models
import ProfileModel from '../../../models/ProfileSchema'
// Utils
import { connect } from '../../../utils/mongoDB'
import { setCookie } from '../../../utils/cookies'


type Data = {
  data?: Object
  error?: any
}


const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect()

  const { method } = req
  switch(method) {
    
    case 'GET':
        try {
            setCookie(res, 'currentUser', "", {
                maxAge: 2592000000,
                path: '/',
            })
            res.status(202).json( {data: ""} )
        }
        catch(err) {
          console.error(err)
          const errorObject: {error: any} = {error: err}
          res.status(400).json( errorObject )
        }
    break

    default: 
        res.status(400).json( {error: "Failed"} )
  } 
}

export default handler