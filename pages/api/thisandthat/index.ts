// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// Utils
import { connect, models } from '../../../utils/mongoDB'
// Models
import ThisAndThatModel from '../../../models/ThisAndThat'
import ProfileModel from '../../../models/ProfileSchema'


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
        break
    
      /*   case 'POST':
            try {
                const profile = await ProfileModel.create(profileDataMapper(req.body))
                res.status(201).json( {data: profile} )
            }
            catch(err) {
                const errorObject: {error: any} = {error: err}
                res.status(400).json( errorObject )
            }
        break */

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