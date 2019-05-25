import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

export function getContactsStart() {
	return {
		type: actionTypes.GET_CONTACTS_START,
	};
}

export function getContactsSuccess(contacts) {
	return {
		type: actionTypes.GET_CONTACTS_SUCCESS,
		contacts
	};
}

export function createNewContact(contact) {
	return {
		type: actionTypes.CREATE_NEW_CONTACT,
		contact
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
		dispatch(getContactsStart());
		return axios.get(`${apiPrefix}/contacts`, {
			params: { search }
		}).then(response => {
			dispatch(getContactsSuccess(response.data));
		});
	}
}

export function getContactById(contactId) {
	return dispatch => {
		return axios.get(`${apiPrefix}/contacts/${contactId}`);
	}
}

export function createContact(contactData) {
	return dispatch => {
		return axios.post(`${apiPrefix}/contacts`, contactData);
	}
}

export function updateContact(contactId, contactData) {
	return dispatch => {
		return axios.patch(`${apiPrefix}/contacts/${contactId}`, contactData);
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