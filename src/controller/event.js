import mongoose from 'mongoose';
import { Router } from 'express';
import Event from '../model/event';
import Detail from '../model/detail';

export default({ config, db }) => {
    let api = Router();

    // '/v1/event/add' - Create
    api.post('/add', (req, res) => {
        let newEvent = new Event();
        newEvent.date = req.body.date;

        newEvent.save(err => {
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
    api.get('/', (req, res) => {
        Event.find({}, (err, events) => {
            if (err) {
                res.send(err);
            } else {
                res.json(events);
            }
        });
    });

    // '/v1/event/:id' - Read 1
    api.get('/:id', (req, res) => {
        Event.findById(req.params.id, (err, event) => {
            if (err) {
                res.send(err);
            } else {
                res.json(event);
            }
        });
    });

    // '/v1/event/:id' - Update
    api.put('/:id', (req, res) => {
        Event.findById(req.params.id, (err, event) => {
            if (err) {
                res.send(err);
            } else {
                event.name = req.body.date;
                event.save(err => {
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
    api.delete('/:id', (req, res) => {
        Event.remove({
            _id: req.params.id
        }, (err, event) => {
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
    api.post('/details/add/:id', (req, res) => {
        Event.findById(req.params.id, (err, event) => {
            if (err) {
                res.send(err);
            } else {
                let newDetail = new Detail();

                newDetail.address = req.body.address;
                newDetail.city = req.body.city;
                newDetail.state = req.body.state;
                newDetail.peopleKilled = req.body.peopleKilled;
                newDetail.peopleInjured = req.body.peopleInjured;
                newDetail.notes = req.body.notes;
                newDetail.source = req.body.source;
                newDetail.imagePath = req.body.imagePath;
                newDetail.event = event._id;

                newDetail.save((err, detail) => {
                    if (err) {
                        res.send(err);
                    } else {
                        event.details.push(newDetail);
                        event.save(err => {
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
    api.get('/details/:id', (req, res) => {
        Detail.find({event: req.params.id}, (err, details) => {
            if (err) {
                res.send(err);
            } else {
                res.json(details);
            }
        });
    });

    return api;

}