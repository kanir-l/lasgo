// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import ProfileModel from '../../../models/ProfileSchema'


type Data = {
  data?: Object
  error?: String
}

const profileDataMapper = (data: { firstName: string; lastName: string; userName: string; email: string; password: string; accountCreated: Date, about: string, image: string, tokenExpiration: string, myChallenges: [], myAcknowledgements: []}) => {
  const value = {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    email: data.email,
    password: data.password,
    accountCreated: data.accountCreated,
    about: data.about,
    image: data.image,
    tokenExpiration: data.tokenExpiration,
    myChallenges: data.myChallenges,
    myAcknowledgements: data.myAcknowledgements
  }
  return value
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect()
  
  const { method } = req
  switch(method) {
    case 'POST':
        try {
            const createdProfile = profileDataMapper(req.body)
            const postProfile = await ProfileModel.create(createdProfile)
            res.status(201).json( {data: postProfile} )
        }
        catch(err) {
            const errorObject: {error: any} = {error: err}
            res.status(400).json( errorObject )
        }
    break

    case 'DELETE':
        try {
            const deletedProfile = await ProfileModel.findById(req.body, async function(_err: any, profile: any){
                return await profile.remove();                
           });
            res.status(200).json( {data: deletedProfile} )
        }
        catch {
            res.status(400).json( {error: "Failed removing the profile"} )
        }
    break

    case 'PUT':
    try {
      const putImage = await ProfileModel.findByIdAndUpdate(req.body.currentUserId, {image: req.body.file})
      res.status(202).json( {data: putImage} ) 
    }
    catch(err) {
        const errorObject: {error: any} = {error: err}
        res.status(400).json( errorObject )
    }
break

    default: 
    res.status(400).json( {error: "Failed"} )
  }
}

export default handler