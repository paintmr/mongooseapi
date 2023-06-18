const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testmongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/testmongoose', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });