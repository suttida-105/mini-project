import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from "axios";
import logger from 'redux-logger';
const user = {
    id: '',
    name: ''
}
const rootReducer = combineReducers({
    

})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))


export default store