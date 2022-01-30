import jwt_decode from "jwt-decode";
import api, { setApiAuthToken } from "../services/api";
import { login, logout } from "../utils/auth";
import { SET_CURRENT_USER } from "./types";

export function registerUser(userData) {
	return async (dispatch) => {
		try {
			const res = await api.post("/users/register", userData);
			const { token, details } = res.data;
			if (token) {
				login(token, details);
				setApiAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser({ ...decoded, ...details }));
			} else {
				console.log("Error registering user", res.data);
			}
		} catch (err) {
			console.log("Error registering user", err);
		}
	};
}

export function loginUser(userData) {
	return async (dispatch) => {
		try {
			const res = await api.post("/users/login", userData);
			const { token, details } = res.data;
			if (token) {
				login(token, details);
				setApiAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser({ ...decoded, ...details }));
			} else {
				console.log("Error loging in user", res.data);
			}
		} catch (err) {
			console.log("Error loging in user", err);
		}
	};
}

export const setCurrentUser = (userData) => {
	return {
		type: SET_CURRENT_USER,
		payload: userData,
	};
};

export const logoutUser = () => (dispatch) => {
	logout();
	setApiAuthToken(false);
	dispatch(setCurrentUser({}));
};
