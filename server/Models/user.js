const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  middlename: {
    type: String,
    required: false,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length validation
  },
  
},
{timestamps:true}
);

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
