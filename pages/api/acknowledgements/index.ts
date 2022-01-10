// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import AcknowledgementModel from '../../../models/AcknowledgementSchema'
import { ObjectId } from 'mongodb'
import ProfileModel from '../../../models/ProfileSchema'
import ChallengeModel from '../../../models/ChallengeSchema'

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
        const getAcknowledgements = await AcknowledgementModel.find()
          .populate(
            {
              path: 'challenge', 
              model: ChallengeModel, 
              populate: {
                path: 'byUser', 
                model: ProfileModel
              }
            })
        res.status(200).json( {data: getAcknowledgements} )
      } 
      catch (error) {
        res.status(200).json( {error: "Fail to render acknowledgements"} )
      }
    break

    case 'POST':
      try {
          const createdAcknowledgement = acknowledgementDataMapper(req.body)
          const existedAcknowledgement = await AcknowledgementModel.find({challenge: req.body.challenge, by: req.body.by})
         
          if (existedAcknowledgement.length === 0) {
            const postAcknowledgement = await AcknowledgementModel.create(createdAcknowledgement)
            res.status(202).json( {data: postAcknowledgement} )
          } else {
            const acknowledgementId = existedAcknowledgement[0]._id
            const updatedChallenge = await AcknowledgementModel.findByIdAndUpdate(acknowledgementId, {picked: req.body.picked})
            res.status(202).json( {data: updatedChallenge} )
          }
      }
      catch(err) {
          console.error(err)
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

    case 'PUT':
      try {
        const putAcknowledgement = await AcknowledgementModel.findByIdAndUpdate(req.body.acknowledgementId, {picked: req.body.picked})
        res.status(202).json( {data: putAcknowledgement} )
      }
      catch(err) {
        res.status(400).json( {error: "Failed to update acknowledgements"} )
      }
    break

    default: 
        res.status(400).json( {error: "Failed"} )
  }
}

export default handler