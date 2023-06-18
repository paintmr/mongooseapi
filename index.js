const express = require('express')
require('./src/db/mongoose')
const User = require('./src/models/user')
const Task = require('./src/models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/users', async (req, res) => {
  try {
    // find()中放入空对象，则是获取所有数据
    const users = await User.find({ name: /ea/ }).exec();;
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    if (req.params.id.length === 12 || req.params.id.length === 24) {
      const user = await User.findById(req.params.id).exec();
      console.log(user)
      if (!user) {
        return res.status(404).send()
      }
      res.send(user);
    } else {
      res.status(400).send('Id should be a string of either 12 or 24 characters.')
    }

  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 上面的post中的async/await和下面post中的promise代码效果一样
app.post('/userpromise', (req, res) => {
  const user = new User(req.body)
  user.save().then(() => {
    res.status(201).send(user);
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({}).exec();;
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/task/:id', async (req, res) => {
  try {
    if (req.params.id.length === 12 || req.params.id.length === 24) {
      const task = await Task.findById(req.params.id).exec();
      console.log(task)
      if (!task) {
        return res.status(404).send()
      }
      res.send(task);
    } else {
      res.status(400).send('Id should be a string of either 12 or 24 characters.')
    }

  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/task', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/task/:id', async (req, res) => {
  // console.log(req.body)
  // return res.send("update");
  try {
    if (req.params.id.length === 12 || req.params.id.length === 24) {
      // const task = await Task.findByIdAndUpdate(req.params.id, { description: req.body.description }).exec(); //findByIdAndUpdate默认返回的是修改前的数据
      // 如果要返回修改后的数据，给findByIdAndUpdate()加参数{ new: true }
      // 如果要检查修改后的数据是否符合在schema中定义的规则，可以添加runValidators:true
      const task = await Task.findByIdAndUpdate(req.params.id, { description: req.body.description }, { new: true, runValidators: true }).exec();

      console.log(task)
      if (task) {
        res.send(task);
      } else {
        res.status(404).send('Task not found.');
      }
    } else {
      res.status(400).send('Id should be a string of either 12 or 24 characters.')
    }

  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/task/:id', async (req, res) => {
  try {
    if (req.params.id.length === 12 || req.params.id.length === 24) {
      const task = await Task.findByIdAndDelete(req.params.id).exec();
      // 还有多少条未完成的数据
      const count = await Task.count({ completed: false });
      console.log(task)
      if (task) {
        // 在 RESTful API 中，DELETE 请求的响应应该是一个空的响应体，而不是返回被删除的任务。因此，下面的代码错误：
        // res.status(204).send(task); //修改为
        // res.status(204).send();
        // 返回还有几条未完成的任务
        res.send(`${count} incomplete tasks`);
      } else {
        res.status(404).send('Task not found.');
      }
    } else {
      res.status(400).send('Id should be a string of either 12 or 24 characters.')
    }

  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log('Server is up on port' + port)
})


