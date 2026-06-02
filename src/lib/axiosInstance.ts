import axios from "axios";

const axiosInstance = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        if(typeof window !== "undefined"){
            const token = localStorage.getItem("token");

            if(token){
                // Ensure headers object exists before assigning to avoid
                // "Cannot set properties of undefined (setting 'Authorization')" errors
                if (!config.headers) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - axios typings for headers can be a plain object or AxiosHeaders
                    config.headers = {};
                }

                // Assign Authorization header in a type-safe way
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;