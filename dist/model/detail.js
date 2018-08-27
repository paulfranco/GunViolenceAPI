'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var DetailSchema = new Schema({
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

module.exports = _mongoose2.default.model('Detail', DetailSchema);
//# sourceMappingURL=detail.js.map