import Header from "./header";
import Sidebar from "./sidebar";
import "./style.css";

function Layout({ children, selected }) {
	return (
		<div className="bg-white font-sans page">
			<Header />
			<Sidebar selected={selected} />
			<div className="content pr-20">{children}</div>
		</div>
	);
}

export default Layout;
