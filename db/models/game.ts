'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
module.exports = mongoose.model('Game', new Schema({
    players: {
        type: Number,
    },
    private_players: {
        type: Number,
    },
    is_active: {
        type: Boolean,
    },
    created_at: {
        type: Date,
    }
}));