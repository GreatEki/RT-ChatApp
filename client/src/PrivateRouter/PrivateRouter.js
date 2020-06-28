import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GeneralContext } from '../contexts/GeneralContext';

const PrivateRouter = ({ component: Component, ...rest }) => {
	const { isAuthenticated, getLoggedInUser } = useContext(GeneralContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/join' }} />
				)
			}
		/>
	);
};

export default PrivateRouter;
