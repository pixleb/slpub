class ABC 
{
    constructor()
    {
        this.instanceErrorMessage = new String('ABC cannot be instanciated.');
        
        if (this.constructor == ABC)
            throw new Error(this.instanceErrorMessage);
    }
}

module.exports = { ABC };