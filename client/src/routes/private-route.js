import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkToken } from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				checkToken() ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default PrivateRoute;
