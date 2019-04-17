

const express = require('express')
const cors = require('cors')


const rtsUser = require('./routes/user.route')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', rtsUser)

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server started at port : ${process.env.PORT}`)
})