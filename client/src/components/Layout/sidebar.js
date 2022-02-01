import { Link } from "react-router-dom";
import globeSvg from "../../assets/svg/globe.svg";

function sidebar({ selected = "home" }) {
	const sections = [
		{
			name: "home",
			title: " Questions",
			svg: globeSvg,
			path: "/",
		},
		{
			name: "users",
			title: " Users",
			path: "/users",
		},
	];

	return (
		<div className="nav border border-r-gray-300">
			<div className="flex flex-wrap justify-end pt-6">
				<div>
					{sections.map((section) => (
						<Link
							to={section.path}
							key={section.title}
							className={`block w-32 p-2 text-left text-sm my-1 rounded-l-md ${
								selected === section.name
									? "font-normal bg-gray-200 border-4 border-solid border-r-primary-orange"
									: "font-light hover:bg-gray-200"
							}`}
						>
							<div className="flex gap-2">
								{section.svg ? <img src={section.svg} alt="" /> : ""}
								<span>{section.title}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default sidebar;
