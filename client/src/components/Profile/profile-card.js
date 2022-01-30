import React from "react";
import { Link } from "react-router-dom";
import { getAvatar } from "../../utils/common";
import millisecondsToStr from "../../utils/time";

export default function ProfileCard({ user }) {
	user.avatar = user.avatar || getAvatar(user.email);

	const timeElapsed = (time) => {
		return (
			"created " +
			millisecondsToStr(new Date().getTime() - new Date(time).getTime()) +
			" ago"
		);
	};

	return (
		<Link
			className="flex rounde-sm hover:bg-gray-200 cursor-pointer p-4"
			key={user.email}
			to={`/users/${user.id}`}
		>
			<div className="w-1/3">
				<img src={user.avatar} alt="avatar" className="w-16 h-16 mr-4" />
			</div>
			<div className="w-2/3 pl-2">
				<div className="text-sm font-medium text-blue-hover-dark rounded-sm">
					{user.name}
				</div>
				<div className="text-sm text-gray-500 font-light">
					{timeElapsed(user.createdAt)}
				</div>
				<div className="font-extrabold font-serif text-gray-600 text-sm">
					<span className="inline-block w-2 h-2 bg-primary-orange rounded-full mr-1 "></span>
					{user.reputation}
				</div>
			</div>
		</Link>
	);
}
