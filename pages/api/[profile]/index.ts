// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, models } from '../../../utils/mongoDB'
// Models
import ProfileModel from '../../../models/ProfileSchema'
import ThisAndThatModel from '../../../models/ThisAndThat'
import PicksModel from '../../../models/Picks'


type Data = {
  data?: Object
  error?: String
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const queryUser = String(req.query.profile)
 
  const { method } = req
  switch(method) {
    case 'GET':
    try {
      await connect()
      const profile = await ProfileModel.find({ userName: queryUser }).populate({path: 'myChallenges', model: ThisAndThatModel}).populate({path: 'myAcknowledgements', model: PicksModel}) 
      res.status(200).json( {data: profile} )
    } catch (error) {
      res.status(200).json( {error: "Something went wrong"} )
    } 
  }
}

export default handler