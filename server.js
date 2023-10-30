// libraries
const express                 = require('express');
const path                    = require('path');
const cors                    = require('cors');

// modules
// miscellaneous
const { Singleton }           = require('./modules/misc/patterns');
// views
const { gAuth, gAuthRefresh } = require('./modules/views/gauth');

// config
const { config }              = require('./backend-config');


//main code
class App extends Singleton
{
    constructor()
    {
        super();
        
        const app = express();
        
        app.use(cors());
        app.use(express.json());

        app.use('/static', express.static('./build/static'));
        app.get('/', async (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));
        
        //gAuth urlpatterns
        app.post('/auth', new gAuth().post);
        app.post('/authRefresh', new gAuthRefresh().post);

        app.listen(3001, () => console.log('Started'));
    }
}

const application = new App();
