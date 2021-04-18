const express = require('express')
const History = require('../models/History')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await History.find().populate('user').catch(next))
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await History.find({ user: id }).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(
    await (await History.create(req.body).catch(next))
      .populate('user')
      .execPopulate()
      .catch(next)
  )
})

module.exports = router
