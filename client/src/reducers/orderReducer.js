import { GET_ORDERS } from "../actions/types";


const INITIAL_STATE = {
    orders: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){ 
        case GET_ORDERS:
            return {
                ...state, orders: action.payload
            };
    }
    return state
};

export default reducer;