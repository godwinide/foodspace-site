import {GET_RIDERS} from './types'
import axios from 'axios'

export const getRiders = userToken => async dispatch => {
    try{
        const res = await axios.get("/api/admin/riders",  {timeout: 30000, headers:{'x-auth-token': userToken}});
        dispatch({
            type: GET_RIDERS,
            payload: res.data.riders
        })
    }catch(err){
        setTimeout(()=> {
            getRiders()(dispatch);
        },30000)
    }
}
