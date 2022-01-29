import React, { useEffect } from "react";
import { checkToken } from "./utils/auth";
import Routes from "./routes";

function App() {
	useEffect(() => {
		checkToken();
	}, []);

	return (
		<div className="bg-[#f1f2f3]">
			<Routes></Routes>
		</div>
	);
}

export default App;
