import { FETCH_ALL_QUESTIONS } from "../actions/types";

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
		default:
			return state;
	}
}
