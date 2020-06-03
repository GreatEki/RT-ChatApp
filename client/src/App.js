import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import GroupList from './components/GroupList/GroupList';
import MessagesArea from './components/MessagesArea/MessagesArea';
import GeneralContextProvider from './contexts/GeneralContext';
import StyleContextProvider from './contexts/StyleContext';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<GeneralContextProvider>
						<StyleContextProvider>
							<Route exact path='/' component={Home} />
							<Route exact path='/join' component={Join} />
							<Route exact path='/chat' component={Chat} />
							<Route exact path='/chat-list' component={GroupList} />
							<Route exact path='/chatter' component={MessagesArea} />

							<Route exact path='/register' component={Register} />
						</StyleContextProvider>
					</GeneralContextProvider>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
