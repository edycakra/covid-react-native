import { SET_LIST, SET_LIST_LOADING } from "../actionTypes";

let initialState = {
    list: [],
    listLoading: false
}

export const list = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return { ...state, list: action.payload };
        case SET_LIST_LOADING:
            return { ...state, listLoading: action.payload };
        default:
            return state;
    }
}