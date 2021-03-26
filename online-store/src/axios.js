import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/online-store-dc8f3/us-central1/api' //THE API (cloud function) URL
});

export default instance;