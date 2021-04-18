const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/', async (req, res, next) => {
  res.json(await User.create(req.body).catch(next))
})

module.exports = router
