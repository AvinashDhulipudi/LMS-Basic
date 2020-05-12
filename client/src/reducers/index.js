import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import classReducer from './classReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    classes: classReducer
})