var mongoose = require('mongoose');

// Define the schema for the user 
var UserSchema = new mongoose.Schema({

    // The user's name
    name: {
        type: String,
        required: true
    },
    // The user's email
    email: {
        type: String,
        required: true
    },
    // The user's password
    password: {
        type: String,
        required: true
    }
});

exports.User = mongoose.model('user', UserSchema);