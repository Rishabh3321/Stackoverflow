import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import questionsReducer from "./questions.reducer";
import usersReducer from "./users.reducer";

export default combineReducers({
	auth: authReducer,
	users: usersReducer,
	questions: questionsReducer,
});
