import axios from 'axios';

const api = axios.create({
    baseURL: "https://play.godmoon.fr/27205/api"
});

export default api;