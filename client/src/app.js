import React from 'react'
import {
    Route,
    Link
} from 'react-router-dom'
import MainPage from './components/main-page/MainPage'
import { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

.app {
    font-family: 'Roboto', sans-serif;
 }
`;
const App = () => (
    <div className="app">
        <Route exact path="/" component={MainPage}/>
    </div>
);
export default App;