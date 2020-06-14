'use strict';
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
module.exports = mongoose.model('Random', new Schema({
    game_id: {
        type: Schema.ObjectId,
    },
    user_name: {
        type: String,
    },
    number: {
        type: String,
    },
    created_at: {
        type: Date,
    }
}));