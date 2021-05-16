const mongoose = require('mongoose');
//Schema
let employee = mongoose.Schema({
    _name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    _profilePic: {
        type: String,
        required: [true, "Profile Pic cannot be empty"]
    },
    _gender: {
        type: String,
        required: [true, "Gender cannot be empty"]
    },
    _salary: {
        type: String,
        required: [true, "Salary cannot be empty"]
    },
    _department: {
        type: Array,
        required: [true, "Department cannot be empty"]
    },
    _startDate: {
        type: String,
        required: [true, "Date cannot be empty"]
    },
    _note: {
        type: String,

    },

}, { timeStamps: true })

// collection
exports.employeeModel = mongoose.model("employee", employee);