import { createStore } from "redux";
import { combineReducers } from "redux";

import currentUser from "./currentUser";

function counter(state = 0, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const Reducer = combineReducers({
    currentUser,
    counter
});

let store = createStore(Reducer);

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1

export default store;

// https://redux.js.org/
