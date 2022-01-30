import jwtDecode from "jwt-decode";
import { logoutUser, setCurrentUser } from "../actions/auth.actions";
import { setApiAuthToken } from "../services/api";
import store from "../store";

export const TOKEN_KEY = "jwt";
export const USERDATA_KEY = "userData";

export const login = (token, userData) => {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USERDATA_KEY, JSON.stringify(userData));
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USERDATA_KEY);
};

export const isLogin = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}
	return false;
};

export const checkToken = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		const token = localStorage.getItem(TOKEN_KEY);
		const userData = JSON.parse(localStorage.getItem(USERDATA_KEY));

		setApiAuthToken(token);
		const decoded = jwtDecode(token);
		store.dispatch(setCurrentUser({ ...decoded, ...userData }));

		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			store.dispatch(logoutUser());
			window.location.href = "./login";
			return false;
		}

		return true;
	}
};
