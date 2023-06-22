import axios from '../api/axios'

export default class AdminNetwork {

    static ADMIN_LIST_URL = "";

    static INSTITUTE_LIST_URL = "/superadmin/institute/fetch-all-institute";


    static async getAllAdmin(token,page, pageSize) {
        const headers = {
            headers: { "X-Auth": token },
            withCredentials: false,
        };

        const response = await axios.post(
            this.ADMIN_LIST_URL,
            { page, pageSize },
            headers
        );

        return response.data;
    }

    static async getInstituteList(token, page, pageSize) {
        const headers = {
            headers: { "X-Auth": token },
            withCredentials: false,
        };

        const response = await axios.post(
            this.INSTITUTE_LIST_URL,
            { page, pageSize },
            headers
        );

        return response.data;
    }

}