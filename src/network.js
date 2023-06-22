import Endpoints from "./constant/endpoints";
import axios from "./api/axios";

export default class AppNetwork {
	static META_URL_STATE = `${Endpoints.baseURL}/getMetaData/state`;

	static USER_PERMISSION_API = `${Endpoints.baseURL}/user/fetch-permission/`;

	static COURSE_URL = "/admin/edit-global-settings/course";

	static TEST_SERIES_URL = "/admin/edit-global-settings/testSeries";

	static QUIZ_URL = "/admin/edit-global-settings/quiz";

	static LIVE_SESSION_URL = "/admin/edit-global-settings/live";

	static FETCH_SETTING_URL = "/admin/fetch-global-settings";

	static ANSWER_WRITING_URL = "/admin/edit-global-settings/answerWriting";
	
	static async fetchCity() {
		const response = await axios.get(this.META_URL_STATE, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: false,
		});

		return response.data;
	}

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

	static async TestSeriesSubmitApi(body, auth) {
		const response = await axios.post(this.TEST_SERIES_URL,body, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}

	static async QuizSubmitApi(body, auth) {
		const response = await axios.post(this.QUIZ_URL,body, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}

	static async LiveSessionSubmitApi(body, auth) {
		const response = await axios.post(this.LIVE_SESSION_URL,body, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}

	static async AnswerWritingSubmitApi(body, auth) {
		const response = await axios.post(this.ANSWER_WRITING_URL,body, {
			headers: {
				"Content-Type": "application/json",
				"X-Auth": auth,
			},
			withCredentials: false,
		});
		return response.data;
	}
	
}
