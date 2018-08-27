import mongoose from 'mongoose';
import Event from './event';
let Schema = mongoose.Schema;

let DetailSchema = new Schema({
    address: {
        type: String,
        required: true,
        default: null
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    peopleKilled: {
        type: Number,
        required: true,
        default: 0
    },
    peopleInjured: {
        type: Number,
        required: true,
        default: 0
    },
    notes: {
        type: String,
        required: false,
        default: null
    },
    source: {
        type: String,
        required: true,
        default: null
    },
    imagePath: {
        type: String,
        required: false,
        default: null
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

module.exports = mongoose.model('Detail', DetailSchema);