import React, { useContext } from 'react';
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
import PrivateRouter from './PrivateRouter/PrivateRouter';
import context from './contexts/GeneralContext';

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
								<PrivateRouter
									exact
									path='/chat/:id'
									auth={context.isAuthenticated}
									component={Chat}
								/>
								<PrivateRouter
									exact
									path='/chat-list'
									auth={context.isAuthenticated}
									component={GroupList}
								/>
								<PrivateRouter
									exact
									path='/search/contacts/:value'
									auth={context.isAuthenticated}
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
