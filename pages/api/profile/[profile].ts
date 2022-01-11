// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import ProfileModel from '../../../models/ProfileSchema'
import ChallengeModel from '../../../models/ChallengeSchema'
import AcknowledgementModel from '../../../models/AcknowledgementSchema'
// Interfaces
import { ProfileInterface } from '../../../interfaces/Profile'


type Data = {
  data?: Object
  error?: String
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect()
  const queryUser = String(req.query.profile)

  const { method } = req
  switch(method) {
    case 'GET':
      try {
        const profile: ProfileInterface = await ProfileModel.find({ userName: queryUser })
          .populate(
            {
              path: 'myChallenges', 
              model: ChallengeModel, 
              populate: {
                path: 'byUser', 
                model: ProfileModel
              }
            }
          )
          .populate(
            {
              path: 'myAcknowledgements', 
              model: AcknowledgementModel, 
              populate: {
                path: 'challenge', model: ChallengeModel, 
                populate: {
                  path: 'byUser', 
                  model: ProfileModel
                }
              }
            }
          )
        res.status(200).json( {data: profile} )
      } 
      catch (error) {
        res.status(400).json( {error: "Failed getting the profile"} )
      } 
    break
    default: 
    res.status(400).json( {error: "Failed"} )
  }
}

export default handler