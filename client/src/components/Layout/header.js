import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../actions/auth.actions";
import LogoSvg from "../../assets/svg/logo.svg";
import { getAvatar } from "../../utils/common";
import Button from "../Button";

function Header({ email, id, isAuthenticated, logoutUser }) {
	const history = useHistory();
	return (
		<div className="header">
			<div className="w-full pb-2 shadow-md bg-white ">
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
							<div className="flex gap-2 ">
								<Link to={"/users/" + id}>
									<img src={getAvatar(email, "tiny")} alt="" />
								</Link>
								<Button
									text="Log out"
									type="blue-primary"
									handleClick={() => {
										logoutUser();
										history.push("/");
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	email: state.auth.user.email,
	id: state.auth.user.id,
});

export default connect(mapStateToProps, { logoutUser })(Header);
