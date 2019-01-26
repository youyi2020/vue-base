import axios from 'axios'

axios.interceptors.request.use((config) => {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export { axios as instance}