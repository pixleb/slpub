const { Singleton } = require('./modules/misc/patterns');

class BasicConfig extends Singleton
{
    constructor()
    {
        super();
        
        this.debug = true;

        if (this.debug) 
            this.rootURL = 'http://localhost:3001';
        else 
            this.rootURL = 'i dunno';
    
        this.googleClientID = '871435621707-t4kpqbspt65v8767hnfdnanri391cu2l.apps.googleusercontent.com';
        this.googleClientSecret = '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';
    }
}

let config = new BasicConfig();
module.exports = { config };
