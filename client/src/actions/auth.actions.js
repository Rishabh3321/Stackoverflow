import jwt_decode from "jwt-decode";
import api, { setApiAuthToken } from "../services/api";
import { login, logout } from "../utils/auth";
import { SET_CURRENT_USER } from "./types";
import toast from "../utils/toast";

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
				toast.success("Sign-up successful");
			} else {
				toast.error(res.data.message);
			}
		} catch (err) {
			toast.error(err.response.data.message);
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
				toast.success("Login successful");
			} else {
				toast.error("Something went wrong, try after sometime");
			}
		} catch (err) {
			toast.error(err.response.data.message);
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
	toast.success("Logout successful");
};
