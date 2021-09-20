import {GET_RESTAURANTS} from './types'
import axios from 'axios'
// import client from 'config/client';

export const getRestaurants = (userToken) => async dispatch => {
    try{
        const res = await axios.get("/api/admin/restaurants", {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_RESTAURANTS,
            payload: res.data.restaurants
        })
    }catch(err){
        setTimeout(()=> {
            getRestaurants()(dispatch);
        },30000)
    }
}
