import api from "../services/api";
import { FETCH_ALL_USERS } from "../actions/types";

export function fetchAllUsers() {
	return async (dispatch) => {
		try {
			const users = await api.get("/users");
			dispatch({
				type: FETCH_ALL_USERS,
				payload: users.data,
			});
		} catch (err) {
			console.log("Error fetching all users", err);
		}
	};
}
