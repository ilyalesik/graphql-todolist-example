import express                   from 'express';
import React      from 'react';
const DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
import { renderToString, renderToStaticMarkup }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes     from '../src/routes';
import reducer from '../src/reducer';
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

    match({ routes, location }, (err, redirectLocation, renderProps) => {
        if(err || (renderProps.location.pathname && renderProps.location.pathname.indexOf('null') >= 0)) {
            logger.error(err);
            return res.render('error', {message: 'Internal server error'});
        }

        if(!renderProps) {
            logger.info(`match react route 404`);
            return res.render("404");
        }

        logger.info(`match react route ${renderProps.location.pathname}`);

        function renderView() {
            logger.debug(`renderView start`);
            try {
                const InitialView = (
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                logger.debug(`renderToString start`);
                const componentHTML =  renderToString(InitialView);
                logger.debug(`renderToString end`);

                const initialState = store.getState();

                logger.debug(`renderView end`);
                return {componentHTML, initialState};
            } catch (e) {
                logger.error(e);
            }
        }

        let renderData = renderView();
        logger.debug(`return response`);
        res.render('index', renderData);
    });
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    logger.info('Server listening on: ' + PORT);
});

export default app;