import React, { useEffect } from "react";
import Routes from "./routes";
import { checkToken } from "./utils/auth";
import { Provider } from "react-redux";
import store from "./store";

function App() {
	useEffect(() => {
		checkToken();
	}, []);

	return (
		<Provider store={store}>
			<div className="bg-base-gray">
				<Routes />
			</div>
		</Provider>
	);
}

export default App;
