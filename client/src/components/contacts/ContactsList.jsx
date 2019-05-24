import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContacts } from '../../actions/contactsActions';
import { Grid, GridColumn, Header, Loader, Menu, Icon, Segment, Dropdown } from 'semantic-ui-react';
import Contact from './Contact';

class ContactsList extends Component {

	componentDidMount() {
		this.setState({ isLoading: true });
		this.props.getContacts(null);
	}

	render() {
		let content = <Header as="h1">Empty</Header>;
		if (this.props.contacts.length) {
			if (this.props.loading) {
				content = <Loader active size='medium'>Loading</Loader>
			} else {
				content = this.props.contacts.map(contact => (
					<GridColumn key={contact._id}>
						<Contact contact={contact} />
					</GridColumn>
				));
			}
		}

		return (
			<div>
				<Menu attached='top'>
					<Dropdown item icon='wrench' simple>
						<Dropdown.Menu>
							<Dropdown.Item>
								<Icon name='dropdown' />
								<span className='text'>New</span>

								<Dropdown.Menu>
									<Dropdown.Item>Document</Dropdown.Item>
									<Dropdown.Item>Image</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Item>
							<Dropdown.Item>Open</Dropdown.Item>
							<Dropdown.Item>Save...</Dropdown.Item>
							<Dropdown.Item>Edit Permissions</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Header>Export</Dropdown.Header>
							<Dropdown.Item>Share</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Menu.Menu position='right'>
						<div className='ui right aligned category search item'>
							<div className='ui transparent icon input'>
								<input className='prompt' type='text' placeholder='Search contacts...' />
								<i className='search link icon' />
							</div>
							<div className='results' />
						</div>
					</Menu.Menu>
				</Menu>

				<Segment attached='bottom'>
					<Grid columns={4}>
						{content}
					</Grid>
				</Segment>
			</div>
		);
	}
};

ContactsList.propTypes = {
	loading: PropTypes.bool,
	contacts: PropTypes.array,
	getContacts: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		loading: state.loading,
		contacts: state.contacts.contacts
	};
}

export default connect(mapStateToProps, { getContacts })(ContactsList);