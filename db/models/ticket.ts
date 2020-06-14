'use strict';
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
module.exports = mongoose.model('Ticket', new Schema({
    game_id: {
        type: Schema.ObjectId,
    },
    user_name: {
        type: String,
    },
    ticket_number: {
        type: Number,
    },
    created_at: {
        type: Date,
    }
}));