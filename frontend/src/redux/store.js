import { combineReducers, createStore } from 'redux';
import snackBarReducer from './reducers/snackBarReducer';
import routeParamsReducer from './reducers/routeParamsReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import loaderReducer from './reducers/loaderReducer';

const reducer = combineReducers({
    snackBarReducer,
    routeParamsReducer,
    authReducer,
    userReducer,
    loaderReducer
});

const store = createStore(reducer, {});

export default store;