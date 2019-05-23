import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(reduxThunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('app'));