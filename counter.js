const router = require('express').Router()

let count = 0
router.post('/increment', (req, res) => {
  console.log('increment')
  ++count
  res.json({ count })
})
router.post('/decrement', (req, res) => {
  console.log('decrement')
  --count
  res.json({ count })
})
router.get('/count', (req, res) => {
  console.log('count')
  res.json({ count })
})

module.exports = router