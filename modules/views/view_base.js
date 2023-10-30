const { Singleton } = require('../misc/patterns');

class View extends Singleton
{
    constructor()
    {
        super();
        
        this.getErrorText = new String('This view have no get response');
        this.postErrorText = new String('This view have no post response');
    }
    
    async get(req, res)
    {
        throw new Error(this.getErrorText);
    }
    
    async post(req, res)
    {
        throw new Error(this.postErrorText);
    }
}

module.exports = { View };