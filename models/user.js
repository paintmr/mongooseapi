const mongoose = require('mongoose');
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/testmongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: {
      validator: function (value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        if (value < 0) {
          throw new Error('Age must be a postive number')
        }
      }
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User