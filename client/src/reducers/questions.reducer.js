import {
	FETCH_ALL_QUESTIONS,
	INCREMENT_QUESTION_VIEWS,
} from "../actions/types";

const initialState = {
	isFetched: false,
	data: [],
};

export default function init(state = initialState, action) {
	switch (action.type) {
		case FETCH_ALL_QUESTIONS:
			return {
				...state,
				isFetched: action.payload.length > 0,
				data: action.payload,
			};
		case INCREMENT_QUESTION_VIEWS: {
			console.log("incrementQuestionViews", action.payload);
			const otherQuestions = state.data.map(
				(question) => question.id !== action.payload.id
			);
			const viewdQuestion = state.data.find(
				(question) => question.id === action.payload.id
			);
			viewdQuestion.views = action.payload.views;
			return {
				...state,
				data: [...otherQuestions, viewdQuestion],
			};
		}

		default:
			return state;
	}
}
