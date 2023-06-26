import Endpoints from "./constant/endpoints";
import axios from "./api/axios";

export default class AppNetwork {
	static META_URL_STATE = `${Endpoints.baseURL}/getMetaData/state`;

	static USER_PERMISSION_API = `${Endpoints.baseURL}/user/fetch-permission/`;

	static FETCH_SETTING_URL = "/admin/fetch-global-settings";

	

	static async FetchSettingApi(auth) {
		const response = await axios.get(this.FETCH_SETTING_URL, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});

		return response.data;
	}

	static async fetchUsersPermission(userId, auth) {
		const response = await axios.get(`${this.USER_PERMISSION_API}${userId}`, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}
	
	static async CourseSubmitApi(body, auth) {
		const response = await axios.post(this.COURSE_URL,body, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}

}
