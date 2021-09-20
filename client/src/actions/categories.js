import {GET_CATEGORIES} from './types'
import axios from 'axios'
// import client from 'config/client';

export const getCategories = userToken => async dispatch => {
    try{
        const res = await axios.get("/api/admin/categories",  {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.categories
        })
    }catch(err){
        setTimeout(()=> {
            getCategories()(dispatch);
        },30000)
    }
}
