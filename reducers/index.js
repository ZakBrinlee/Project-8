import { combineReducers } from 'redux';
import login from './loginReducer';
import groupChannel from './groupChannelReducer';
import groupChannelInvite from './groupChannelInviteReducer';
import chat from './chatReducer';
import profile from './profileReducer';

export default combineReducers({
    login, groupChannel, groupChannelInvite, chat, profile,
});