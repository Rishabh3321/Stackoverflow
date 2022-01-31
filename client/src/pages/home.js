import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchAllQuestions } from "../actions/questions.action";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { getAvatar } from "../utils/common";
import millisecondsToStr from "../utils/time";

function Home({ questions, isFetched, fetchAllQuestions }) {
	const history = useHistory();

	useEffect(() => {
		if (!isFetched) {
			fetchAllQuestions();
		}
	});

	const timeElapsed = (time) => {
		return (
			"asked " +
			millisecondsToStr(new Date().getTime() - new Date(time).getTime())
		);
	};

	return (
		<Layout>
			<div className="flex pt-14">
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
									{questions.length +
										" question" +
										(questions.length > 1 ? "s" : "")}
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
													<div className="text-xs">Votes</div>
												</div>
												<div className="w-full text-center m-1">
													<div>{answers}</div>
													<div className="text-xs">Answers</div>
												</div>
												<div className="w-full text-sm text-center mt-4">
													{views + " view" + (views > 1 ? "s" : "")}
												</div>
											</div>
											<div className="w-11/12 pl-5 text-sm">
												<Link
													to={`question/${question._id}`}
													className="font-sans font-normal text-primary-blue "
												>
													{title}
												</Link>
												<div className="font-sans text-gray-light">{body}</div>
												<div className="mt-2 flex justify-end">
													<div>
														<span className="text-xs w-full text-center text-gray-800">
															{timeElapsed(question.createdAt)}
														</span>
														<Link
															className="mt-1 flex gap-2"
															to={`users/${user_id}`}
														>
															<img
																src={getAvatar(email, "tiny")}
																alt="avatar"
															/>
															<div className="text-primary-blue text-xs">
																<span>{name}</span>
																<div className="flex items-center">
																	<div className="m-2 border-2 border-primary-orange bg-primary-orange w-2 h-2 rounded-full" />
																	<span> {reputation}</span>
																</div>
															</div>
														</Link>
													</div>
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
