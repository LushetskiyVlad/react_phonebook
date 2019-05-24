import * as propTypes from '../actions/actionTypes';

const initialState = ({
	loading: false,
	contacts: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case propTypes.SET_CONTACTS:
			return {
				loading: false,
				contacts: action.contacts
			}
		case propTypes.SET_CONTACTS_START:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
};