const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
        name: String,               // Get Artist
        popularity: Number,         // Get Artist
        genres: [String],           // Get Artist
        followers_total: Number,    // Get Artist
    },
    {
        timestamps: true,
    }
);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;