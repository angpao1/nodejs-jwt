const express = require('express')
const router = express.Router()

const crtlUser = require('../controllers/user.controller')

router.post('/register', crtlUser.register)
router.get('/', crtlUser.getAllUsers)

module.exports = router 