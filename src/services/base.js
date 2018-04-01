import axios from "axios";

const NetApi = axios.create({
    // baseURL: "http://dev.sis.1gai.cn/",
    withCredentials: true,
    headers: {
        // 跨域
    }
});

NetApi.interceptors.response.use(
    response => {
        let data = response.data;
        if (data.state === 0) {
            return data;
        } else {
            return Promise.reject(data);
        }
    },
    err => {
        return Promise.reject(err);
    }
);

const JavaApi = axios.create({
    // baseURL: "/api/java",
    withCredentials: true,
    headers: {
        // 跨域
    }
});

export default { NetApi, JavaApi };
export { NetApi, JavaApi };
