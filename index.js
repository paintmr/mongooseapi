const express = require('express')
require('./db/mongoose')
const User = require('./models/user')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/users', (req, res) => {
  // 在这里编写处理 "/users" 路径的逻辑
  res.send('Hello, users!');
});

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(port, () => {
  console.log('Server is up on port' + port)
})