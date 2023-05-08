import axios from "axios";
import Refresher from './refresher';
import { setAccessToken, setRefreshToken } from "./localStorage";

export type AxiosConfigT = {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean;
};

const API_URL = "https://studerus.online/api";
// const API_URL = "http://localhost:8080/api";
const axiosConfig: AxiosConfigT = {
    baseURL: API_URL,
    timeout: 25000,
};

const instance = axios.create(axiosConfig);
const refresher = new Refresher(axiosConfig);

instance.interceptors.request.use(async (req) => {
    return refresher.use(req);
})

instance.interceptors.response.use((res) => {
    if (res.data.access_token) {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
    }
    return res;
})

export default instance;
