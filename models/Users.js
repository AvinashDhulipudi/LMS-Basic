const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    class: [{
        type: Schema.Types.ObjectId,
        ref: 'class'
    }],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users',UserSchema); 