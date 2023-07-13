import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token")) {
      request.headers.Authorization = localStorage.setItem("token");
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
    console.log(error.response);
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
