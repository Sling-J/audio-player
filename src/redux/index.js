import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";

import history from "../config/history";
import reducers from './reducers';

const enhancer = applyMiddleware(
   thunkMiddleware,
   routerMiddleware(history)
);

export default createStore(reducers(history), composeWithDevTools(enhancer));
