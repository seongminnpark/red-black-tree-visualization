import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import * as reducers from "./ducks";

export default function configureStore(initialState) {
    const rootReducer = combineReducers( reducers );

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware())
    );
}
