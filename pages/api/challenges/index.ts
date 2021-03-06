// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect } from '../../../utils/mongoDB'
// Models
import ChallengeModel from '../../../models/ChallengeSchema'
import { ObjectId } from 'mongodb'
import ProfileModel from '../../../models/ProfileSchema'


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
                const getChallenges = await ChallengeModel.find()
                    .populate(
                        {
                            path: 'byUser', 
                            model: ProfileModel
                        }
                    )
                res.status(200).json( {data: getChallenges} )
            } 
            catch (error) {
                res.status(200).json( {error: "Fail to render challenges"} )
            }
        break
    
        case 'POST':
            try {
                const createdChallenge = challengeDataMapper(req.body)
                const postChallenge = await ChallengeModel.create(createdChallenge)
                res.status(202).json( {data: postChallenge} )
            }
            catch(err) {
                const errorObject: {error: any} = {error: err}
                res.status(400).json( errorObject )
            }
        break

        case 'DELETE':
            try {
                const deletedChallenge = await ChallengeModel.findById(req.body, async function(err: object, challenge: {remove: Function}){
                    return challenge.remove()              
                }).clone()
                res.status(200).json( {data: {deletedChallenge}} )  
            }
            catch {
                res.status(400).json( {error: "Failed to remove challenges"} )
            }
        break

        default: 
        res.status(400).json( {error: "Failed"} )
    } 
}

export default handler