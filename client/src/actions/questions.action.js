import api from "../services/api";
import { FETCH_ALL_QUESTIONS } from "../actions/types";

export function fetchAllQuestions(limit = 10, offset = 0) {
	return async (dispatch) => {
		try {
			const users = await api.get(`question?limit=${limit}&offset=${offset}`);
			dispatch({
				type: FETCH_ALL_QUESTIONS,
				payload: users.data,
			});
		} catch (err) {
			console.log("Error fetching all questions", err);
		}
	};
}
