import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Join from './components/Join/Join';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/join' component={Join} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
