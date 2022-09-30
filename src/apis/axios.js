import axios from "axios";
let API_ROOT = process.env.REACT_APP_API_ROOT;

const client = axios.create({
    baseURL: API_ROOT 
});

export default client;