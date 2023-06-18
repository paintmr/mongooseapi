const express = require('express')
const router = new express.Router()
router.get('/users', (req, res) => { res.send('Express router slice') })

module.exports = router