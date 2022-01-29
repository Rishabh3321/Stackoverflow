import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import LogoSvg from "../../assets/svg/logo.svg";
import Button from "../Button";

function Header({ isAuthenticated, logoutUser }) {
	const history = useHistory();
	return (
		<div className="w-full pb-2 sticky top-0 shadow-lg bg-white">
			<div className="w-full h-1 bg-primary-orange" />
			<div className="max-w-[1200px] m-auto flex justify-between pt-2">
				<img
					src={LogoSvg}
					alt="logo"
					className="w-32 cursor-pointer"
					onClick={() => {
						history.push("/");
					}}
				/>
				<div className="flex justify-end gap-2">
					{!isAuthenticated ? (
						<>
							<Button
								text="Log in"
								type="blue"
								handleClick={() => history.push("/login")}
							/>
							<Button
								text="Sign up"
								type="blue-primary"
								handleClick={() => history.push("/signup")}
							/>
						</>
					) : (
						<Button
							text="Log out"
							type="blue-primary"
							handleClick={() => {
								logoutUser();
								history.push("/");
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(Header);
