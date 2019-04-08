import * as types from './types';

export const initTree = () => ({
    type: types.INIT_TREE
});

export const insert = (data) => ({
    type: types.INSERT,
    payload: {
        data
    }
});
