import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/authActions';
import { Button, Form, Message, Loader } from 'semantic-ui-react'
import validateInput from '../../validations/login';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.login(this.state).then(
				(res) => { this.setState({isLoading:false}) },
				(err) => this.setState({
					errors: err.response ?
						err.response.data.errors : {}, isLoading: false
				})
			);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		return (
			<Form error onSubmit={this.onSubmit}>
				<Message error content={errors.form} />
				<Form.Field>
					<label>Email</label>
					<input
						type="text"
						name="email"
						onChange={this.onChange}
						value={this.state.email}
						placeholder="Email address" />
				</Form.Field>
				<Message error content={errors.email} />
				<Form.Field>
					<label>Password</label>
					<input
						type="text"
						name="password"
						onChange={this.onChange}
						value={this.state.password}
						placeholder="Password" />
				</Form.Field>
				<Message error content={errors.password} />
				<Loader active={this.state.isLoading} size='medium'>Loading</Loader>
				<Button disabled={this.state.isLoading} type='submit'>Login</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginForm);