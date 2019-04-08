import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from '../../utils';

import Tree from '../../../core/tree/Tree';

const initialState = [];

const treeReducer = createReducer(initialState) ({
    [types.INIT_TREE]: (state, action) => {
        return [
            state.tree = new Tree()
        ];
    },
    
    [types.INSERT]: (state, action) => {
        return [
            state
        ]
    }
});

export default treeReducer;





