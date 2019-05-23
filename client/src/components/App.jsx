import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import SignupPage from "./signup/SignupPage";
import NotFound from "./NotFound";
import { Container } from 'semantic-ui-react'

class App extends Component {
	render() {
		return (
			<Router>
				<Container>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/signup" component={SignupPage} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			</Router>
		);
	}
};

export default App;