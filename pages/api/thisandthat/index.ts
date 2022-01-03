// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import ThisAndThatModel from '../../../models/ThisAndThat'
import ProfileModel from '../../../models/ProfileSchema'
import { ObjectId } from 'mongodb'


type Data = {
  data?: Object
  error?: any
}

const challengeDataMapper = (data: { challengeThis: string; challengeThat: string; created: Date; byUser: ObjectId }) => {
    const value = {
      challengeThis: data.challengeThis,
      challengeThat: data.challengeThat,
      created: data.created,
      byUser: data.byUser
    }
    return value
  }

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await connect()

    const { method } = req
    switch(method) {
        case 'GET':
            try {
                const challenges = await ThisAndThatModel.find()
                res.status(200).json( {data: challenges} )
            } catch (error) {
                res.status(200).json( {error: "Something went wrong"} )
            }
        break
    
        case 'POST':
            try {
                const challenge = await ThisAndThatModel.create(challengeDataMapper(req.body))
                res.status(202).json( {data: challenge} )
            }
            catch(err) {
                const errorObject: {error: any} = {error: err}
                res.status(400).json( errorObject )
            }
        break

        case 'DELETE':
        try {
            const challenge = await ThisAndThatModel.deleteOne( {_id: req.body} )
            res.status(200).json( {data: {challenge}} )
            // TODO: also need to delete/update the list of array in the myChallenges in the profile user
        }
        catch {
            res.status(400).json( {error: "Failed removing the profile"} )
        }
        break

        default: 
        res.status(400).json( {error: "Failed"} )
    } 
}

export default handler