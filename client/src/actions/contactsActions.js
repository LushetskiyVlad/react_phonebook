import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as propTypes from './actionTypes';

export function setContactsStart() {
	return {
		type: propTypes.SET_CONTACTS_START,
	};
}
export function setContactsSuccess(contacts) {
	return {
		type: propTypes.SET_CONTACTS,
		contacts
	};
}

export function getContacts(search) {
	return dispatch => {
		dispatch(setContactsStart());
		return axios.get(`${apiPrefix}/contacts`, {
			params: { search }
		}).then(response => {
			dispatch(setContactsSuccess(response.data));
		});
	}
}

export function createContact(contactData) {
	return dispatch => {
		return axios.post(`${apiPrefix}/contacts`, contactData);
	}
}