import axios from "axios";
import store from "../store";
import router from "../router";

const baseDomain = process.env.VUE_APP_API_URL;
const baseURL = `${baseDomain}`;

const instance = axios.create({
    baseURL
});
instance.interceptors.request.use(function (config) {
    if (store.getters["auth/isValidDateToken"]) {
        config.headers.Authorization = store.getters["auth/token"];
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if(response.headers.hasOwnProperty('authorization')) {
        store.dispatch("auth/updateToken", {
            token: response.headers.authorization
        });
    }
    return response;
}, (error) => {
    if (error.response.status === 401 || error.response.status === 403 ) {
        store.dispatch("auth/removeToken");
        const path = error.response.data.path;
        const to = path.split(window.location.origin).pop();

        router.push({ name: 'Login', params: { to: to, invalidToken: true}})
    } else {
        throw error;
    }
});

export default instance;
