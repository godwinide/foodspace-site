import { GET_RESTAURANTS } from "../actions/types";


const INITIAL_STATE = {
    restaurants: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){ 
        case GET_RESTAURANTS:
            return {
                ...state, restaurants: action.payload
            };
    }
    return state
};

export default reducer;