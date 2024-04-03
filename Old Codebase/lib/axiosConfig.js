import axios from "axios";

const axiosDefaultConfig = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.DEVELOPMENT_URL
      : process.env.PRODUCTION_URL,
};

const Axios = axios.create(axiosDefaultConfig);

export default Axios;
