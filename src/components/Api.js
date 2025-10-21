import axios from "axios";

// Create axios instance
const Api = axios.create({
    baseURL: "https://digidial-admin.onrender.com",
})

// Intercepter to attach token dynamically

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
});

export default Api;