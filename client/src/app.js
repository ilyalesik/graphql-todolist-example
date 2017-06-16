import React from 'react'
import {
    Route,
    Link
} from 'react-router-dom'
import MainPage from './components/main-page/MainPage'

const App = () => (
    <div>
        <Route exact path="/" component={MainPage}/>
    </div>
);
export default App;