import axios from "axios";

const NetApi = axios.create({
    baseURL: "/api",
    headers: {
        // 跨域
    }
});

const JavaApi = axios.create({
    baseURL: "/api/java",
    headers: {
        // 跨域
    }
});

export default { NetApi, JavaApi };
