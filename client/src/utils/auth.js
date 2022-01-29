import jwtDecode from "jwt-decode";

const TOKEN_KEY = "jwt";

export const login = (token) => {
	localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}

	return false;
};

export const checkToken = () => {
	// check for token to keep user logged in
	if (localStorage.getItem(TOKEN_KEY)) {
		// set auth token header auth
		const token = localStorage.getItem(TOKEN_KEY);
		// setAuthToken(token);
		// decode token and get user info and expiry
		const decoded = jwtDecode(token);
		// set user and isAuthenticated
		// store.dispatch(setCurrentUser(decoded));
		console.log(token, decoded);
		// check for expired token
		const currentTime = Date.now() / 1000; // time in millisecs
		if (decoded.exp < currentTime) {
			// logout user
			// store.dispatch(logoutUser());
			// redirect to login
			window.location.href = "./login";
			return false;
		}
		return true;
	}
};
