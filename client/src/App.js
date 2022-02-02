import React, { useEffect } from "react";
import Routes from "./routes";
import { checkToken } from "./utils/auth";
import { Provider } from "react-redux";
import store from "./store";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	useEffect(() => {
		checkToken();
	}, []);

	return (
		<Provider store={store}>
			<div className="bg-base-gray">
				<Routes />
				<ToastContainer
					hideProgressBar
					position={toast.POSITION.BOTTOM_RIGHT}
					transition={Slide}
					autoClose={3000}
				/>
			</div>
		</Provider>
	);
}

export default App;
