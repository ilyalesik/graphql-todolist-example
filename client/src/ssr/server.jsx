import express                   from 'express';
import React      from 'react';
const DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
import { renderToString }        from 'react-dom/server'
import { StaticRouter } from 'react-router';
import App from '../app'
import reducer from '../reducer';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider }              from 'react-redux';
import createLocation from 'history/lib/createLocation';
import path                      from 'path';

const log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file',
            filename: 'logs/server.log',
            category: 'server',
            "pattern": "-MM-dd",
            "alwaysIncludePattern": true,
            "maxLogSize": 102400,
        }
    ]
});

const logger = log4js.getLogger('server');
logger.setLevel(process.env.LOG_LEVEL || 'ERROR');


const app = express();

if (process.env.NODE_ENV !== 'production') {
    logger.info(`NODE_ENV is develop`);
    require('../webpack.config').default(app);
} else {
    logger.info(`NODE_ENV is production`);
    app.use('/', express.static('./dist'));
}

app.use(express.static('./dist'));
app.use('/static', express.static('./public'));


app.set('views', './server');
app.set('view engine', 'pug');

app.use((req, res) => {
    const location = createLocation(req.url);
    logger.debug(`match express route ${req.url}`);
    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
    )(createStore);

    const store = createStoreWithMiddleware(reducer);

    const context = {};
    const componentHTML = renderToString(
        <StaticRouter
            location={req.url}
            context={store}
        >
            <App/>
        </StaticRouter>
    );
    const initialState = store.getState();
    res.render('index', {componentHTML, initialState});
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    logger.info('Server listening on: ' + PORT);
});

export default app;