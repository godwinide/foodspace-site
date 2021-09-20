import { GET_ORDERS } from './types'
import axios from 'axios'
// import client from 'config/client';

export const getOrders = userToken => async dispatch => {
    try{
        const res = await axios.get("/api/admin/customers/orders",  {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_ORDERS,
            payload: res.data.orders
        });
        setTimeout(()=> {
            getOrders()(dispatch);
        },30000)
    }catch(err){
        setTimeout(()=> {
            getOrders()(dispatch);
        },30000)
    }
}
