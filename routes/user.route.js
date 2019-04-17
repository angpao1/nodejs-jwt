const express = require('express')
const router = express.Router()

const ctrlUser = require('../controllers/user.controller')

router.post('/register', ctrlUser.register)
router.get('/', ctrlUser.getAllUsers)
router.post('/authenticate', ctrlUser.authenticate);

module.exports = router 