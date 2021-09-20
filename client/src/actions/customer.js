import {GET_CUSTOMERS} from './types'
import axios from 'axios'

export const getCustomers = userToken => async dispatch => {
    try{
        const res = await axios.get("/api/admin/customers",  {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data.customers
        })
    }catch(err){
        setTimeout(()=> {
            getCustomers()(dispatch);
        },30000)
    }
}
