const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await User.find().catch(next))
})

// router.get('/:id', async (req, res, next) => {
//   const { id } = req.params
//   res.json(await User.findById(id).catch(next))
// })

router.get('/:name', async (req, res, next) => {
  const { name } = req.params
  res.json(await User.find({ name: name }).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await User.create(req.body)).catch(next)
})

module.exports = router

//TODO check populate and model of User again -> goal: search for user and get all history entries
// SOLUTION -> (see MDN docs) search for user ID in all history entries
