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

    const css = new Set(); // CSS for all rendered React components
    const context = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
    const componentHTML = renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
            <App/>
        </StaticRouter>
    );
    const initialState = store.getState();
    res.render('index', {css: [...css].join(''), componentHTML, initialState});
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    console.log('Server listening on: ' + PORT);
});

export default app;