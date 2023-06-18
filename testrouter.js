const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = new express.Router()
router.get('/users', (req, res) => { res.send('Express router') })
app.use(router)

app.listen(port, () => {
  console.log('Server is up on port' + port)
})