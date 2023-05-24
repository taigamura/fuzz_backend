const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            index: true
        },
        display_name: String,
        followers: Number,
        image_url: String,
        instagram_id: String,
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        }],
        joined_date: Date,
        age: Number,
        gender: String
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;