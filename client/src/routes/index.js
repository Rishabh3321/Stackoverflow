import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "../pages/home";
import Users from "../pages/users";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "./private-route";
import Profile from "../pages/profile";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route path="/users/:id" component={Profile} />
				<Route exact path="/users" component={Users} />
			</Switch>
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
		</BrowserRouter>
	);
}

export default Routes;
