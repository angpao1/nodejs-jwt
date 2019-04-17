require('../configs/config')

const mongoose = require('mongoose')
const User = require('../models/user.model')

module.exports.register = (req, res, next) => {
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (!err) { console.log('MongoDB connection succeeded. ') }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
    }).then(() => {
        const user = new User(req.body)
        user.save((err, doc) => {
            if (!err) {
                res.status(201).send(doc)
            } else {
                res.send(err)
            }
        })
    })

}