import express from 'express';
import config from'../config';
import middleware from '../middleware';
import initializeDb from '../db';
import event from '../controller/event';

let router = express();

// connect to db
initializeDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // api routes v1 (/v1)
    router.use('/event', event({ config, db }));
});

export default router;