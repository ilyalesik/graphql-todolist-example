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
import path                      from 'path';
import { ServerStyleSheet } from 'styled-components'



const app = express();

if (process.env.NODE_ENV !== 'production') {
    console.log(`NODE_ENV is develop`);
    require('../../webpack.config').default(app);
} else {
    console.log(`NODE_ENV is production`);
    app.use('/', express.static('./dist'));
}

app.use(express.static('./dist'));
app.use('/static', express.static('./public'));


app.set('views', './src/ssr');
app.set('view engine', 'pug');

app.use((req, res) => {
    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
    )(createStore);

    const store = createStoreWithMiddleware(reducer);

    const sheet = new ServerStyleSheet();
    const componentHTML = renderToString(
        sheet.collectStyles(
        <StaticRouter
            location={req.url}
            context={store}
        >
            <App/>
        </StaticRouter>
        )
    );
    const initialState = store.getState();
    res.render('index', {css: sheet.getStyleTags(), componentHTML, initialState});
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    console.log('Server listening on: ' + PORT);
});

export default app;