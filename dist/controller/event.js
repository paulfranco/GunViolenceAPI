'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _event = require('../model/event');

var _event2 = _interopRequireDefault(_event);

var _detail = require('../model/detail');

var _detail2 = _interopRequireDefault(_detail);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // '/v1/event/add' - Create
    api.post('/add', _authMiddleware.authenticate, function (req, res) {
        var newEvent = new _event2.default();
        newEvent.date = req.body.date;

        newEvent.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    "message": "Event saved Successfully"
                });
            }
        });
    });

    // '/v1/event' - Read All Events
    api.get('/', function (req, res) {
        _event2.default.find({}, function (err, events) {
            if (err) {
                res.send(err);
            } else {
                res.json(events);
            }
        });
    });

    // '/v1/event/:id' - Read 1
    api.get('/:id', function (req, res) {
        _event2.default.findById(req.params.id, function (err, event) {
            if (err) {
                res.send(err);
            } else {
                res.json(event);
            }
        });
    });

    // '/v1/event/:id' - Update
    api.put('/:id', _authMiddleware.authenticate, function (req, res) {
        _event2.default.findById(req.params.id, function (err, event) {
            if (err) {
                res.send(err);
            } else {
                event.name = req.body.date;
                event.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            message: "Event Information Updated"
                        });
                    }
                });
            }
        });
    });

    // '/v1/event/:id' - Delete
    api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
        _event2.default.remove({
            _id: req.params.id
        }, function (err, event) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: "Event Successfully Removed"
                });
            }
        });
    });

    // add details for a specific event id
    // 'v1/event/details/add/:id
    api.post('/details/add/:id', _authMiddleware.authenticate, function (req, res) {
        _event2.default.findById(req.params.id, function (err, event) {
            if (err) {
                res.send(err);
            } else {
                var newDetail = new _detail2.default();

                newDetail.address = req.body.address;
                newDetail.city = req.body.city;
                newDetail.state = req.body.state;
                newDetail.peopleKilled = req.body.peopleKilled;
                newDetail.peopleInjured = req.body.peopleInjured;
                newDetail.notes = req.body.notes;
                newDetail.source = req.body.source;
                newDetail.imagePath = req.body.imagePath;
                newDetail.event = event._id;

                newDetail.save(function (err, detail) {
                    if (err) {
                        res.send(err);
                    } else {
                        event.details.push(newDetail);
                        event.save(function (err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({
                                    message: "Detail Successfully Saved"
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    // Get detail for a specific event id
    // '/v1/details/:id'
    api.get('/details/:id', function (req, res) {
        _detail2.default.find({ event: req.params.id }, function (err, details) {
            if (err) {
                res.send(err);
            } else {
                res.json(details);
            }
        });
    });

    return api;
};
//# sourceMappingURL=event.js.map