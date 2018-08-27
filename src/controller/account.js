import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
    let api = Router();

    //'/v1/account'
    api.post('/register', (req, res) => {
        Account.register(new Account({ username: req.body.email }), req.body.password, function(err, account) {
            if (err) {
                res.send(err);
            } else {
                passport.authenticate(
                    'local', {
                        session: false
                    })(req, res, () => {
                        res.status(200).send('Successfully created new account');
                    }
                );
            }
        });
    });

    // '/v1/account/login' - Log In
    api.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
        }), generateAccessToken, respond);

    // 'v1/account/logout' - Log Out
    api.get('/logout', authenticate, (req, res) => {
        res.logout();
        res.status(200).send("Successfully logged out");
    });

    // Loged in user
    api.get('/me', authenticate, (req, res) => {
        res.status(200).json(req.user);
    });

    return api;
}