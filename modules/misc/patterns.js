const { ABC } = require('./abc');

class Singleton extends ABC
{
    _instance = null;
    
    constructor()
    {
        super();
        
        if (!this.constructor._instance) this.constructor._instance = this;
        else throw new Error('Singleton cannot have more than one instance.');
    }
}

module.exports = { Singleton };