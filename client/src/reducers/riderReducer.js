import { GET_RIDERS } from "../actions/types";


const INITIAL_STATE = {
    riders: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){ 
        case GET_RIDERS:
            return {
                ...state, riders: action.payload
            };
    }
    return state
};

export default reducer;