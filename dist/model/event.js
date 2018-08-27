'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _detail = require('./detail');

var _detail2 = _interopRequireDefault(_detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var EventSchema = new Schema({
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

module.exports = _mongoose2.default.model('Event', EventSchema);
//# sourceMappingURL=event.js.map