import axios from "axios";

export default axios.create({
	baseURL: "https://api.softkitesinfo.com",
	// baseURL: "http://192.168.0.242:6060",
	// baseURL: 'http://83.136.248.110:7070'
});
