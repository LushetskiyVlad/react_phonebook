import React from 'react';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
	render() {
		if (this.props.auth.isAuthenticated===true) {
			return <Redirect to="/" />
		}
		return (
			<Container >
				<Grid centered>
					<GridColumn width="6">
						<Header textAlign="center" as="h1">Login</Header>
						<LoginForm />
					</GridColumn>
				</Grid>
			</Container>
		);
	}
}

LoginPage.propTypes = {
	auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(LoginPage);