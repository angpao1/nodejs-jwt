

const express = require('express')
const cors = require('cors')


const rtsUser = require('./routes/user.route')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', rtsUser)



app.listen(process.env.PORT, () => {
    console.log(`Server started at port : ${process.env.PORT}`)
})