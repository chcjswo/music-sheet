const mongoose = require('mongoose');
const schema = mongoose.Schema;

const musicSchema = schema({
    room_name: {
        type: String,
        unique: true
    },
    room_pass: {
        type: String
    },
    music_sheet: {
        type: Object
    },
    memo: {
        type: String
    },
    reg_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Music", musicSchema);
