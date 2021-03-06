import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import IconSvg from "../../assets/svg/icon.svg";
import Button from "../Button";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth.actions";

function SignupForm({ isAuthenticated, registerUser }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const history = useHistory();

	const onSubmit = async (e) => {
		const body = {
			name,
			email,
			password,
		};

		try {
			registerUser(body);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/");
		}
	}, [isAuthenticated, history]);

	return (
		<div className="w-full flex flex-wrap justify-center items-center pt-10">
			<div className="w-80 justify-center items-center flex-wrap">
				<Link to="/">
					<img src={IconSvg} alt="icon" className="w-10 m-auto" />
				</Link>
				<div className="mt-10 w-full bg-white py-10 px-5 rounded-lg shadow-2xl">
					<p className="font-sans font-medium">Display Name</p>
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						className="border border-gray-300 rounded-sm p-1 mt-2 w-full focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
					/>
					<p className="font-sans font-medium mt-6">Email</p>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						className="border border-gray-300 rounded-sm p-1 mt-2 w-full focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
					/>
					<p className="font-sans font-medium mt-6">Password</p>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						className="border border-gray-300 rounded-sm p-1 mt-2 w-full focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
					/>
					<Button
						text="Sign Up"
						className=" text-sm font-medium mt-6 w-full"
						type="blue-primary"
						handleClick={onSubmit}
					></Button>
				</div>
				<div className="mt-10 text-sm text-center">
					<p>
						Already have an account?{"        "}
						<Link to="/login" className="text-blue-dark">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(SignupForm);
