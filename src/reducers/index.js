import { combineReducers } from 'redux';
import posts from './post';
import auth from './authReducer'
export default combineReducers({
 posts,
 auth
})