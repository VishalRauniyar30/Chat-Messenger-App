import { connect } from "getstream"
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { StreamChat } from "stream-chat"
import dotenv from 'dotenv'

dotenv.config()

const api_key = 'vp8f747k5396'
const api_secret = 'g4zmtgr9zakf2285uj6xrd6mchsyygbqtnavh9mm52qe9vv27x5as2xded2qxsbf'
const app_id = '1339885'
// const api_key = process.env.STREAM_API_KEY
// const api_secret = process.env.STREAM_API_SECRET
// const app_id = process.env.STREAM_APP_ID

export const signIn = async(req, res) => {
    try {
        const { username, password } = req.body
        const serverClient = connect(api_key, api_secret, app_id)

        const client = StreamChat.getInstance(api_key, api_secret)

        const { users } = await client.queryUsers({ name : username }) 

        if(!users.length) return res.status(400).json({ message : 'User Not Found' })

        const success = await bcrypt.compare(password, users[0].hashedPassword) 
        
        const token = serverClient.createUserToken(users[0].id)

        if(success) {
            res.status(200).json({ token, fullName : users[0].fullName, username, userId : users[0].id })
        } else {
            res.status(500).json({ message : 'Incorrect Passoword' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message : error })
    }
}

export const signUp = async(req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body
        const userId = crypto.randomBytes(16).toString('hex')
        
        const serverClient = connect(api_key, api_secret, app_id)

        const hashedPassword = await bcrypt.hash(password, 10)

        const token = serverClient.createUserToken(userId)

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message : error })
    }
} 