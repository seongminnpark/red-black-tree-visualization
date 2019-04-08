import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from '../../utils';

const initialState = [];

const treeReducer = createReducer(initialState) ({
    [types.INIT_TREE]: (state, action) => {
        return [
            state
        ];
    },
    
    [types.INSERT]: (state, action) => {
        return [
            state
        ]
    }
});

export default treeReducer;





