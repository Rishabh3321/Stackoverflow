import React from "react";

function Button({ text, type, handleClick, className }) {
	const styles = {
		blue: "text-blue-dark bg-blue-light rounded-sm px-3 py-2 text-xs border border-blue-border-light hover:bg-blue-hover-light",
		"blue-primary":
			"text-blue-light bg-blue-dark rounded-sm px-3 py-2 text-xs border border-blue-border-light hover:bg-blue-hover-dark",
		"orange-primary":
			"bg-primary-orange hover:bg-primary-orange-dark text-white font-bold py-2 px-4 rounded",
	};

	return (
		<div
			className={`
				${
					styles[type] || styles["blue"]
				} ${className} text-center cursor-pointer select-none`}
			onClick={handleClick}
		>
			{text}
		</div>
	);
}

export default Button;
