import api from "../services/api";
import {
	FETCH_ALL_QUESTIONS,
	INCREMENT_QUESTION_VIEWS,
} from "../actions/types";
import toast from "../utils/toast";

export function fetchAllQuestions(limit = 10, offset = 0) {
	return async (dispatch) => {
		try {
			const questions = await api.get(
				`question?limit=${limit}&offset=${offset}`
			);
			dispatch({
				type: FETCH_ALL_QUESTIONS,
				payload: questions.data,
			});
		} catch (err) {
			toast.error(err.response.data.message);
			console.log("Error fetching all questions", err);
		}
	};
}

export function incrementQuestionViews(questionId) {
	console.log("incrementQuestionViews", questionId);
	return async (dispatch) => {
		try {
			const question = await api.put(`question/${questionId}/view`);
			dispatch({
				type: INCREMENT_QUESTION_VIEWS,
				payload: {
					id: question.data.id,
					views: question.data.views,
				},
			});
		} catch (err) {
			console.log("Error ", err);
		}
	};
}
