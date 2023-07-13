import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 6000,
  headers: {
    "content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (request) => {
    console.log(request, "From Interceptor");
    if (localStorage.getItem("token")) {
      request.headers.Authorization = localStorage.getItem("token");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response && response.data;
  },
  (error) => {
    console.log(error.response, "From interceptor");
    if (error.response.status === 400) {
      console.error("❌❌❌❌BAD REQUEST❌❌❌❌", error.response.data.message);
    }
    if (error.response.status === 401) {
      console.error("❌❌❌❌UNATHORISED❌❌❌❌", error.response.data.message);
    }
    if (error.response.status === 404) {
      console.error("❌❌❌❌NOT FOUND❌❌❌❌", error.response.data.message);
    }
    if (error.response.status === 502) {
      console.error("❌❌❌❌BAD GATEWAY❌❌❌❌", error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
