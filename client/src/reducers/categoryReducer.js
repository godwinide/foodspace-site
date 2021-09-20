import { GET_CATEGORIES } from "../actions/types";


const INITIAL_STATE = {
    categories: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type){ 
        case GET_CATEGORIES:
            return {
                ...state, categories: action.payload
            };
    }
    return state
};

export default reducer;