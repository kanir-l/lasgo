// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, models } from '../../../utils/mongoDB'
// Models
import ProfileModel from '../../../models/ProfileSchema'


type Data = {
  data?: Object
  error?: String
}

const profileDataMapper = (data: { firstName: string; lastName: string; userName: string; email: string; password: string; accountCreated: Date }) => {
  console.log('Received created data', data)
  const value = {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    email: data.email,
    password: data.password,
    accountCreated: data.accountCreated
  }
  return value
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect()
  
  const { method } = req
  switch(method) {
    case 'POST':
      try {
        const profile = await ProfileModel.create(profileDataMapper(req.body))
        res.status(201).json( {data: profile} )
      }
      catch {
        res.status(400).json( {error: "Failed creating the profile"} )
      }

    break
    default: 
    res.status(400).json( {error: "Failed"} )
  }
}

export default handler