// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Models
import ProfileModel from '../../../models/ProfileSchema'
import ChallengeModel from '../../../models/ChallengeSchema'
import AcknowledgementModel from '../../../models/AcknowledgementSchema'


type Data = {
  data?: Object
  error?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req

  switch(method) {
    case 'GET':
    try {
      const profiles = await ProfileModel.find().populate({path: 'myChallenges', model: ChallengeModel}).populate({path: 'myAcknowledgements', model: AcknowledgementModel})
      res.status(200).json( {data: profiles} )
    } catch (error) {
      console.log(error)
      res.status(200).json( {error: "Something went wrong"} )
    }
  }
}

export default handler