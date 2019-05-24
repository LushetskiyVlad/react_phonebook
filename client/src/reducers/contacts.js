import * as actionTypes from '../actions/actionTypes';

const initialState = ({
	loading: false,
	contacts: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CONTACTS_SUCCESS:
			return {
				loading: false,
				contacts: action.contacts
			}
		case actionTypes.SET_CONTACTS_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(c => c._id !== action.id)
			}
		default:
			return state;
	}
};