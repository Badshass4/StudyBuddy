import { combineReducers, createStore } from 'redux';
import snackBarReducer from './reducers/snackBarReducer';

const reducer = combineReducers({
    snackBarReducer
});

const store = createStore(reducer, {});

export default store;