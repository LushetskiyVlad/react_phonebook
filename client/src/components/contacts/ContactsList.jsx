import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContacts } from '../../actions/contactsActions';
import { Grid, GridColumn, Header, Loader, Menu, Segment, Button } from 'semantic-ui-react';
import Contact from './Contact';

class ContactsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	componentDidMount() {
		this.props.getContacts(null);
	}

	onSearchClick(e) {
		e.preventDefault();
		if (this.state.searchText !== "") {
			this.props.getContacts(this.state.searchText);
		}
	}

	onChange(e) {
		this.setState({ searchText: e.target.value });
		const str = e.target.value.trim();
		this.props.getContacts(str.length > 0 ? str : null);
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
					<Menu.Menu>
						<Menu.Item>
							<Button circular icon='add' />
						</Menu.Item>
					</Menu.Menu>

					<Menu.Menu position='right'>
						<div className='ui right aligned category search item'>
							<div className='ui transparent icon input'>
								<input className='prompt' onChange={this.onChange} type='text' placeholder='Search contacts...' />
								<i className='search link icon' onClick={this.onSearchClick} />
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