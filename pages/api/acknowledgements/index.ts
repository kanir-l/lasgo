// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import AcknowledgementModel from '../../../models/AcknowledgementSchema'
import { ObjectId } from 'mongodb'

type Data = {
  data?: Object
  error?: any
}

const acknowledgementDataMapper = (data: { challenge: ObjectId; picked: string, by: ObjectId }) => {
  const value = {
    challenge: data.challenge,
    picked: data.picked,
    by: data.by
  }
  return value
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect()

  const { method } = req
  switch(method) {
    case 'GET':
      try {
        const acknowledgements = await AcknowledgementModel.find()
        res.status(200).json( {data: acknowledgements} )
      } 
      catch (error) {
        res.status(200).json( {error: "Fail to render acknowledgements"} )
      }
    break

    case 'POST':
      try {
          const createdAcknowledgement = acknowledgementDataMapper(req.body)
          const acknowledgement = await AcknowledgementModel.create(createdAcknowledgement)
          res.status(202).json( {data: acknowledgement} )
      }
      catch(err) {
          const errorObject: {error: any} = {error: err}
          res.status(400).json( errorObject )
      }
    break

    case 'DELETE':
      try {
          const deletedAcknowledgement = await AcknowledgementModel.findById(req.body, async function(err: object, acknowledgement: {remove: Function}){
              return await acknowledgement.remove()              
          }).clone()
          res.status(200).json( {data: {deletedAcknowledgement}} )  
      }
      catch {
          res.status(400).json( {error: "Failed to remove acknowledgements"} )
      }
    break

    default: 
        res.status(400).json( {error: "Failed"} )
  }
}

export default handler