import React from "react";
import { useHistory } from "react-router-dom";
import LogoSvg from "../../assets/svg/logo.svg";
import Button from "../Button";

function Header() {
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
				</div>
			</div>
		</div>
	);
}
export default Header;
