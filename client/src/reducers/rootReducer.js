import { combineReducers } from 'redux';
import authReducer from './authReducer';
import customerReducer from './customerReducer'
import categoryReducer from './categoryReducer'
import foodReducer from './foodReducer'
import orderReducer from './orderReducer'
import restaurant from './restaurantReducer'
import rider from './riderReducer'

const rootReducer = combineReducers({
    customer: customerReducer,
    auth: authReducer,
    food: foodReducer,
    order: orderReducer,
    category: categoryReducer,
    restaurant: restaurant,
    rider: rider
});

export default rootReducer;