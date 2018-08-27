import mongoose from 'mongoose';
import Detail from './detail';
let Schema = mongoose.Schema;

let EventSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'Detail'
    }]
});

module.exports = mongoose.model('Event', EventSchema);