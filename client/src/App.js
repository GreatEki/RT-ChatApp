import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import GeneralContextProvider from './contexts/GeneralContext';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<GeneralContextProvider>
						<Route exact path='/' component={Home} />
						<Route exact path='/join' component={Join} />
						<Route exact path='/chat' component={Chat} />
					</GeneralContextProvider>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
