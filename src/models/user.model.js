const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: String,
        display_name: String,
        followers: Number,
        image_url: String,
        instagram_id: String,
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        joined_date: Date,
        age: Number,
        gender: String
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;