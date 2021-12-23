// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect, models } from '../../../utils/mongoDB'
// Models
import ThisAndThatModel from '../../../models/ThisAndThat'


type Data = {
  data?: Object
  error?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { method } = req

    switch(method) {
      case 'GET':
      try {
        await connect()
        const profiles = await ThisAndThatModel.find()
        res.status(200).json( {data: profiles} )
      } catch (error) {
        res.status(200).json( {error: "Something went wrong"} )
      }
    } 
}

export default handler