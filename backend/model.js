const mongoose = require('mongoose');
const { Schema } = mongoose;

const audio = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    duration: {
        type: Number,
        min: 0,
        required: true
    },
    size: {
        type: Number,
        min: 0,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

audio.method({
});

const AudioFile = mongoose.model('AudioFiles', audio)
module.exports = AudioFile