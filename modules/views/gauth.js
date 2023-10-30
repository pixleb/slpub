// libraries
const express          = require('express');
const session          = require('express-sessions');

// doesn't work with node 14
const { OAuth2Client } = require('google-auth-library');

const axios            = require('axios');

// modules
const { View }         = require('./view_base');
const { Singleton }    = require('../misc/patterns');
const { UserModel }    = require('../models');

//config
const { config }       = require('../../backend-config');

// main code
class _gAuthDataObject extends Singleton
{
    constructor() 
    {
        super();
        
        this.client = new OAuth2Client(
            config.googleClientID,
            config.googleClientSecret,
            'postmessage',
        );
    }
}

const _authData = new _gAuthDataObject();

// view
class gAuth extends View 
{
    // modifies base view class
    async post(req, res)
    {
        let data = req.body.res, userData, userID, response;
        const ticket = await _authData.client.verifyIdToken({
            idToken: data.credential,
            audience: config.googleClientID
        });
        userData = ticket.getPayload(), userID = userData.sub;
        response = { picture: userData.picture }
  
        UserModel.findOrCreate({ where: { googleID: userID } });
        
        return res.json(response);
    }
}

// view 
class gAuthRefresh extends View 
{
    async post(req, res)
    {
        const user = new UserRefreshClient(
            config.googleClientID,
            config.googleClientSecret,
            req.body.refreshToken,
        );
        const { credentials } = await user.refreshAccessToken();
        return res.json(credentials);
    }
}

module.exports = { gAuth, gAuthRefresh }
