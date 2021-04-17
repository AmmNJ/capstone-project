const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await User.find().catch(next))
})

router.get('/:name', async (req, res, next) => {
  const { name } = req.params
  res.json(await User.find({ name: name }).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await User.create(req.body)).catch(next)
})

module.exports = router
