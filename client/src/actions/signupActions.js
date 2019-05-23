import axios from 'axios';
import { apiPrefix } from '../config.json';

export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post(`${apiPrefix}/user/signup`, userData);
	}
}