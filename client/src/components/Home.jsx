import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactsList from './contacts/ContactsList';
import { Container, Header } from 'semantic-ui-react';

class Home extends Component {
	render() {
		const { isAuthenticated } = this.props.auth;
		return (
			<Container>
				{isAuthenticated ? <ContactsList /> : <Header textAlign="center">Sign in to view contacts</Header>}
			</Container>
		);
	}
};

Home.propTypes = {
	auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(Home);