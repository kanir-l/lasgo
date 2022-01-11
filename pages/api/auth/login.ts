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
    
    case 'POST':
        try {
            const postLogIn = await ProfileModel.findOne({userName: req.body.userName})
            // does the user exist
            // does the user's password match
            // if yes, access to the profile
            // if no, response with error
            if (postLogIn && postLogIn.password === req.body.password) {
              const userObject = {
                id: postLogIn._id,
                userName: postLogIn.userName
              }
              setCookie(res, 'currentUser', userObject, {
                maxAge: 2592000000,
                path: '/',
              })
              res.status(202).json( {data: postLogIn} )
            } else {
              res.status(404).json( {data: "User with supplied password could not be found."} )
            }
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