import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';
import { deleteContact } from '../../actions/contactsActions';

class Contact extends Component {

	onDeleteClick(e) {
		e.preventDefault();
		this.props.deleteContact(this.props.contact._id);
	}

	render() {
		const contact = this.props.contact;
		return (
			<Card fluid style={{ height: "100%" }}>
				<Image src={contact.photo} wrapped ui={false} rounded />
				<Card.Content>
					<Card.Header>{contact.name}</Card.Header>
					<Card.Meta>
						{contact.company}
					</Card.Meta>
					<Card.Description>
						<span>Phone: {contact.phone}</span>
						<br />
						<span>Email: {contact.email}</span>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui two buttons'>
						<Button basic color='green'>Edit</Button>
						<Button onClick={this.onDeleteClick.bind(this)} basic color='red'>Delete</Button>
					</div>
				</Card.Content>
			</Card >
		);
	}
}

Contact.propTypes = {
	deleteContact: PropTypes.func
}

export default connect(null, { deleteContact })(Contact);