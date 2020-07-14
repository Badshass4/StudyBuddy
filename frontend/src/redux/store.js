import { combineReducers, createStore } from 'redux';
import snackBarReducer from './reducers/snackBarReducer';
import routeParamsReducer from './reducers/routeParamsReducer';


const reducer = combineReducers({
    snackBarReducer,
    routeParamsReducer
});

const store = createStore(reducer, {});

export default store;