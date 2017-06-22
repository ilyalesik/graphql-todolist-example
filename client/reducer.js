import {combineReducers} from 'redux'
import reducer1 from './reducers/reducer1'
import {intlReducer} from 'react-intl-redux'


export default combineReducers({
    reducer1,
    intl: intlReducer
});
