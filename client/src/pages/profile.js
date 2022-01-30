import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import { getAvatar } from "../utils/common";
import millisecondsToStr from "../utils/time";

function Profile() {
	const { id } = useParams();
	const [user, setUser] = useState(null);

	const fetchUserProfile = useCallback(async () => {
		const response = await api.get("/users/" + id);
		const user = response.data;
		user.avatar = getAvatar(user.email, "medium");
		setUser(user);
	}, [id]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	const timeElapsed = (time) => {
		return millisecondsToStr(new Date().getTime() - new Date(time).getTime());
	};

	return (
		<Layout selected="users">
			{user ? (
				<div className="pl-10 pt-10 flex">
					<div className="shadow-lg border-2 border-b-primary-orange">
						<div className="p-5 bg-gray-200">
							<img src={user.avatar} alt="avatar" />
						</div>
						<div className="p-2">
							<p className="text-xl text-gray-700 text-center font-bold">
								{user.name}
							</p>
							<p className="text-sm text-gray-700 text-center">
								Created{" "}
								<span className="font-semibold">
									{timeElapsed(user.createdAt)} ago
								</span>
							</p>
						</div>
					</div>
					<div className="p-10">
						<table>
							<tbody>
								<tr>
									<td className="text-gray-700 text-lg">Reputation</td>
									<td className="text-gray-700 text-lg font-semibold pl-10 ">
										{user.reputation}
									</td>
								</tr>
								<tr>
									<td className="text-gray-700 text-lg">Questions Asked</td>
									<td className="text-gray-700 text-lg font-semibold pl-10 ">
										{user.questions.length}
									</td>
								</tr>
								<tr>
									<td className="text-gray-700 text-lg">Answers given</td>
									<td className="text-gray-700 text-sm font-semibold pl-10 ">
										{user.answers.length}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			) : (
				""
			)}
		</Layout>
	);
}

export default Profile;
