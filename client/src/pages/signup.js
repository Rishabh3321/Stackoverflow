import SignupForm from "../components/Auth/signup";
import Header from "../components/Layout/header";

function Signup() {
	return (
		<div className="min-h-screen">
			<Header />
			<SignupForm />
		</div>
	);
}

export default Signup;
