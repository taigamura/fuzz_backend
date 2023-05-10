const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
        members: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;