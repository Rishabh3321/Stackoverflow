import { useHistory } from "react-router-dom";
import Header from "../components/Layout/header";
import api from "../services/api";

function AskQuestion() {
	const history = useHistory();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value;
		}
		const { title, body } = data;
		try {
			const reponse = await api.post("/question/create", { title, body });
			history.push("question/" + reponse.data.id);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen">
			<Header />
			<div className="max-w-3xl mx-auto">
				<div className="my-10 text-2xl ">Ask a public question</div>
				<form onSubmit={handleFormSubmit}>
					<div className="bg-white py-6 px-4 shadow-md">
						<p className="text-sm font-semibold"> Title </p>
						<p className="text-xs text-gray-600">
							Be specific and imagine you’re asking a question to another person
						</p>
						<input
							type="text"
							name="title"
							className="w-full my-2 text-base border border-gray-300 rounded-sm p-1 placeholder:opacity-60 focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
							placeholder="for e.g. why map over async functions don't work"
							required
						/>

						<p className="text-sm font-semibold"> Body </p>
						<p className="text-xs text-gray-600">
							Include all the information someone would need to answer your
							question
						</p>
						<textarea
							type="text"
							name="body"
							className="w-full h-28 my-2 text-base border border-gray-300 rounded-sm p-1 placeholder:opacity-60 focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
							placeholder="for e.g. Are there any issues with using async/await in a forEach loop? I'm trying to loop through an array of files and await on the contents of each file."
							required
						/>
					</div>

					<button
						type="submit"
						className="mt-6 px-4 py-2 text-white bg-primary-blue rounded-sm"
					>
						Post your question
					</button>
				</form>
			</div>
		</div>
	);
}

export default AskQuestion;
