import axios from 'axios';

const internalApi = axios.create({
    baseURL: 'http://localhost:5108/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

const externalApi = axios.create({
    baseURL: 'https://api.binance.com/api/v3', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export { externalApi, internalApi };