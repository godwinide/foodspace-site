import { GET_FOODS } from './types'
import axios from 'axios'
// import client from 'config/client';

export const getFoods = userToken => async dispatch => {
    try{
        const res = await axios.get("/api/admin/foods",  {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_FOODS,
            payload: res.data.foods
        })
    }catch(err){
        setTimeout(()=> {
            getFoods()(dispatch);
        },30000)
    }
}
