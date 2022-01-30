import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../actions/users.action";
import SearchSvg from "../assets/svg/search.svg";
import Layout from "../components/Layout";
import ProfileCard from "../components/Profile/profile-card";

function Users({ users, isFetched, fetchAllUsers }) {
	const [search, setSearch] = React.useState("");
	const [filteredUsers, setFilteredUsers] = React.useState(users);

	useEffect(() => {
		if (!isFetched) {
			fetchAllUsers();
		}
	}, [fetchAllUsers, isFetched]);

	useEffect(() => {
		const filtered = users.filter((user) => {
			return user.name.toLowerCase().includes(search.toLowerCase());
		});
		setFilteredUsers(filtered);
	}, [search, users]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
		const filteredUsers = users.filter((user) => {
			return user.name.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setFilteredUsers(filteredUsers);
	};

	return (
		<Layout selected={"users"}>
			<div className="w-full pt-12 pl-10 text-2xl font-sans">
				<span>Users</span>
				<div className="w-44 flex border border-gray-300 rounded-sm p-1 mt-2 focus-within:border-blue-dark focus-within:ring-1 focus-within:ring-blue-dark">
					<img src={SearchSvg} alt="search" className="w-4 mr-2" />
					<input
						type="text"
						className="w-36 text-sm focus:outline-none"
						placeholder="Search by name"
						value={search}
						onChange={(e) => handleSearch(e)}
					></input>
				</div>

				<div className="grid grid-cols-4 mt-10">
					{isFetched &&
						filteredUsers.map((user) => (
							<ProfileCard user={user} key={user.id} />
						))}
				</div>
			</div>
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		users: state.users.data,
		isFetched: state.users.isFetched,
	};
};

export default connect(mapStateToProps, { fetchAllUsers })(Users);
