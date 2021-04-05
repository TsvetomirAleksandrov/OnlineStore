import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-online-store-1f7b2.cloudfunctions.net/api' 
});

export default instance;