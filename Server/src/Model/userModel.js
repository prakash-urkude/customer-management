const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
        type: Date,
        default: Date.now
      },
}, { timestamps: true });

module.exports = mongoose.model('employee' , employeeSchema)