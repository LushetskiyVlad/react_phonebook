import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../actions/authActions';
import { Button, Menu } from 'semantic-ui-react'

class Header extends Component {
	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		console.dir(this.props);
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
			<Menu.Menu position='right'>
				<Menu.Item>
					<a href="#" onClick={this.logout.bind(this)}>Logout</a>
				</Menu.Item>
			</Menu.Menu>
		);

		const guestLinks = (
			<Menu.Menu position='right'>
				<Menu.Item>
					<Link to="/login">Login</Link>
				</Menu.Item>
				<Menu.Item>
					<Button primary>
						<Link style={{ color: "white" }} to="/signup">Sign Up</Link>
					</Button>
				</Menu.Item>
			</Menu.Menu>
		);

		return (
			<Menu size='tiny'>
				<Menu.Item>
					<Link to="/">Home</Link>
				</Menu.Item>

				{isAuthenticated ? userLinks : guestLinks}

			</Menu>
		);
	}
}

Header.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(Header);