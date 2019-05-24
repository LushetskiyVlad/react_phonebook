import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

class Contact extends Component {
	render() {
		const contact = this.props.contact;
		return (
			<Card fluid style={{height: "100%"}}>
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
						<Button basic color='green'>
							Edit
						</Button>
						<Button basic color='red'>
							Delete
						</Button>
					</div>
				</Card.Content>
			</Card >
		);
	}
}

export default Contact;