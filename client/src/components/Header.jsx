import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Menu } from 'semantic-ui-react'

class Header extends Component {
	render() {
		return (
			<Menu size='tiny'>
				<Menu.Item>
					<Link to="/">Home</Link>
				</Menu.Item>

				<Menu.Menu position='right'>
					<Menu.Item>
						<Button primary>
							<Link style={{ color: "white" }} to="/signup">Sign Up</Link>
						</Button>
					</Menu.Item>
				</Menu.Menu>

			</Menu>
		);
	}
}

export default Header;