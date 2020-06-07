import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import GroupList from './components/GroupList/GroupList';
import MessagesArea from './components/MessagesArea/MessagesArea';
import Search from './components/GroupList/Search';
import GeneralContextProvider from './contexts/GeneralContext';
import StyleContextProvider from './contexts/StyleContext';
import ContactsContextProvider from './contexts/ContactsContext';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<GeneralContextProvider>
						<ContactsContextProvider>
							<StyleContextProvider>
								<Route exact path='/' component={Home} />
								<Route exact path='/join' component={Join} />
								<Route exact path='/chat' component={Chat} />
								<Route exact path='/chat-list' component={GroupList} />
								<Route
									exact
									path='/search/contacts/:value'
									component={Search}
								/>
								<Route exact path='/chatter' component={MessagesArea} />

								<Route exact path='/register' component={Register} />
							</StyleContextProvider>
						</ContactsContextProvider>
					</GeneralContextProvider>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
