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
        mongoose.connection.close()
    })

}

module.exports.getAllUsers = (req, res, next) => {
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (!err) { console.log('MongoDB connection succeeded. ') }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
    }).then(() => {
        User.find().exec((err, users) => {
            if (err) {
                res.status(400).send(err)
                mongoose.connection.close()
            } else {
                res.status(200).json(users)
                mongoose.connection.close()
            }
        })
    })
}