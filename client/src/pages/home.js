import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchAllQuestions } from "../actions/questions.action";
import Button from "../components/Button";
import Layout from "../components/Layout";
import MiniProfile from "../components/Profile/mini-profile";
import { pluralize } from "../utils/common";

function Home({ questions, isFetched, fetchAllQuestions }) {
	const history = useHistory();

	useEffect(() => {
		if (!isFetched) {
			fetchAllQuestions();
		}
	});

	return (
		<Layout>
			<div className="flex pt-10">
				<div className="w-10/12">
					<div className="border-b-2 border-b-gray-300">
						<div className="pl-10 w-full flex justify-between">
							<span className="text-2xl font-sans">All Questions</span>
							<Button
								text="Ask Question"
								type="blue-primary"
								classname="w-14"
								handleClick={() => {
									history.push("/ask-question");
								}}
							/>
						</div>
						<div className="pl-10 py-5">
							{isFetched ? (
								<span className="block w-full">
									{questions.length + pluralize(questions.length, " question")}
								</span>
							) : (
								<span> Loading... </span>
							)}
						</div>
					</div>
					{isFetched ? (
						<div>
							{questions.map((question, index) => {
								const { title, user_id, body, email, name, reputation } =
									question.versions.at(-1);
								const votes = question.votes.length || 0;
								const answers = question.answers.length || 0;
								const views = question.views || 0;

								return (
									<div
										className="w-full p-5 border-b border-b-gray-300"
										key={index}
									>
										<div className="flex">
											<div className="w-1/12 font-light text-gray-light">
												<div className="w-full text-center m-1">
													<div>{votes}</div>
													<div className="text-xs">
														{pluralize(votes, " Vote")}
													</div>
												</div>
												<div className="w-full text-center m-1">
													<div>{answers}</div>
													<div className="text-xs">
														{pluralize(answers, " Answer")}
													</div>
												</div>
												<div className="w-full text-sm text-center mt-4">
													{views + pluralize(views, " view")}
												</div>
											</div>
											<div className="w-11/12 pl-5">
												<Link
													to={`question/${question._id}`}
													className="font-sans font-normal text-primary-blue text-lg"
												>
													{title}
												</Link>
												<div className="font-sans text-gray-800 text-base break-words whitespace-pre-wrap">
													{body.slice(0, 250) + "..."}
												</div>
												<div className="mt-2 flex justify-end">
													<MiniProfile
														user_id={user_id}
														name={name}
														reputation={reputation}
														email={email}
														createdAt={question.createdAt}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div>Loading...</div>
					)}
				</div>
				<div className="w-2/12" />
			</div>
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		questions: state.questions.data,
		isFetched: state.questions.isFetched,
	};
};

export default connect(mapStateToProps, { fetchAllQuestions })(Home);
