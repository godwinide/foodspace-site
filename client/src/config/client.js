import axios from 'axios'


const client = axios.create({
    baseURL: "http:192.168.43.97:2021/api",
    headers: {
        Accept: "application/json"
    }
});


export default client;


