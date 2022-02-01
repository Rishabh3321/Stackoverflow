import { Link } from "react-router-dom";
import { getAvatar } from "../../utils/common";
import { timeElapsed } from "../../utils/time";

function MiniProfile({
	name,
	reputation,
	email,
	user_id,
	createdAt,
	isAnswered,
}) {
	return (
		<div>
			<span className="text-xs w-full text-center text-gray-800">
				{` ${isAnswered ? "answered" : "asked"} ${timeElapsed(createdAt)} ago`}
			</span>
			<Link className="mt-1 flex gap-2" to={`/users/${user_id}`}>
				<img src={getAvatar(email, "tiny")} alt="avatar" />
				<div className="text-primary-blue text-xs">
					<span>{name}</span>
					<div className="flex items-center">
						<div className="m-2 border-2 border-primary-orange bg-primary-orange w-2 h-2 rounded-full" />
						<span> {reputation}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default MiniProfile;
