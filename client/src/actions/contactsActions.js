import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

export function setContactsStart() {
	return {
		type: actionTypes.SET_CONTACTS_START,
	};
}
export function setContactsSuccess(contacts) {
	return {
		type: actionTypes.SET_CONTACTS_SUCCESS,
		contacts
	};
}

export function deleteContactFromState(contactId) {
	return {
		type: actionTypes.DELETE_CONTACT,
		id: contactId
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

export function deleteContact(contactId) {
	return dispatch => {
		return axios.delete(`${apiPrefix}/contacts/${contactId}`)
			.then(res => {
				dispatch(deleteContactFromState(contactId));
			});
	}
}