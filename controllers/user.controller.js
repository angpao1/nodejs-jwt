require('../configs/config')

const mongoose = require('mongoose')
const passport = require('passport')
const _ = require('lodash');
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
                if (err.code == 11000) {
                    res.status(422).send(['Duplicate email adrress found.']);
                } else {
                    return next(err)
                }
            }
        })
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

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    mongoose.connect(process.env.MONGODB_URI, (err) => {
        if (!err) { console.log('MongoDB connection succeeded. ') }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
    }).then(() => {
        passport.authenticate('local', (err, user, info) => {
            // error from passport middleware
            if (err) return res.status(400).json(err);
            // registered user
            else if (user) return res.status(200).json({ "token": user.generateJwt() });
            // unknown user or wrong password
            else return res.status(404).json(info);
        })(req, res);
    })

}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'fullName', 'email']) });
        }
    );
}