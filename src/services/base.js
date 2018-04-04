import axios from "axios";

const NetApi = axios.create({
    // baseURL: "http://dev.sis.1gai.cn/",
    withCredentials: true,
    headers: {
        // 跨域
    }
});

const JavaApi = axios.create({
    baseURL: "/api/java/",
    withCredentials: true,
    headers: {
        // 跨域
    }
});

[NetApi, JavaApi].forEach(api => {
    api.interceptors.response.use(
        response => {
            let data = response.data;
            if (data.state === 0) {
                return data;
            }
    
            if (data.state === 999901) {
                // no auth
            }
    
            if (data.state === 999902) {
                // no permission
            }
    
            return Promise.reject(data);
        },
        err => {
            return Promise.reject(err);
        }
    );
});

export default { NetApi, JavaApi, axios };
export { NetApi, JavaApi, axios };
