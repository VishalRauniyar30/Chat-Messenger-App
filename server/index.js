import express from 'express'
import cors from 'cors'
import twilio from 'twilio'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID

const twilioClient = twilio(accountSid, authToken)

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended : true }))

app.get('/' , (req, res) => {
    res.send('App is Successfully Running')
})

app.post('/',(req, res) => {
    const { message, user : sender, type, members } = req.body

    if(type === 'message.new') {
        members
        .filter((member) => member.user_id !== sender.id)
        .forEach(({ user }) => {
            if(!user.online) {
                twilioClient.messages.create({
                    body : `You Have a New Message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid : messagingServiceSid,
                    to : user.phoneNumber
                }).then(() => console.log('Message Sent'))
                .catch((err) => console.log(err))
            }
        })
        return res.status(200).send("Message Sent!!")
    }
    return res.status(200).send('Not a New Message Request')
})

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server Running on Port:${PORT}`))

