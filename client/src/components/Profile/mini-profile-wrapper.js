import { useEffect, useState } from "react";
import api from "../../services/api";
import MiniProfile from "./mini-profile";

function MiniProfileWrapper({ id, isAnswered }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		let isSubscribed = true;

		const fetchUser = async () => {
			const { data } = await api.get(`/users/${id}`);
			if (isSubscribed) {
				setUser(data);
			}
		};

		if (id) {
			fetchUser(id);
		}
		return () => (isSubscribed = false);
	}, [id]);

	return user ? (
		<MiniProfile
			user_id={user.id}
			createdAt={user.createdAt}
			email={user.email}
			name={user.name}
			reputation={user.reputation}
			isAnswered
		/>
	) : null;
}

export default MiniProfileWrapper;
