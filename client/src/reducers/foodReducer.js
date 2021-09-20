import { GET_FOODS } from "../actions/types";


const INITIAL_STATE = {
    foods: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){ 
        case GET_FOODS:
            return {
                ...state, foods: action.payload
            };
    }
    return state
};

export default reducer;