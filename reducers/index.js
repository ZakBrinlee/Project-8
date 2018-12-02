import { combineReducers } from 'redux';
import login from './loginReducer';
import groupChannel from './groupChannelReducer';

export default combineReducers({
    login, groupChannel
});