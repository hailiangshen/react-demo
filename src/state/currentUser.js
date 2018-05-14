import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./actionTypes";

export default function(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.data
            };
        case CLEAR_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
