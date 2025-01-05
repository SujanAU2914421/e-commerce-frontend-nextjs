import Axios from "axios";
import Cookies from "js-cookie";

// Example axios instance configuration
const axios = Axios.create({
	baseURL: "http://localhost:8000/api/",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Adding an interceptor for requests
axios.interceptors.request.use(
	function (config) {
		const token = Cookies.get("auth_token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Adding an interceptor for responses
axios.interceptors.response.use(
	function (response) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error.response || error.message);
	}
);

export default axios;
