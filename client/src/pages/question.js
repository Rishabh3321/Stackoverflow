import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import downvoteSvg from "../assets/svg/downvote.svg";
import upvoteSvg from "../assets/svg/upvote.svg";
import AnswerList from "../components/Answers/answer-list";
import Button from "../components/Button";
import Layout from "../components/Layout";
import MiniProfileWrapper from "../components/Profile/mini-profile-wrapper";
import api from "../services/api";
import { countVote, pluralize } from "../utils/common";
import { timeElapsed } from "../utils/time";
import toast from "../utils/toast";
import { incrementQuestionViews } from "../actions/questions.action";

function Question({ incrementQuestionViews }) {
	const history = useHistory();
	const { id } = useParams();
	const [question, setQuestion] = useState(null);
	const [answer, setAnswer] = useState("");
	const [forceUpdate, setForceUpdate] = useState(0);

	const fetchQuestion = useCallback(async () => {
		const { data } = await api.get(`/question/${id}`);
		setQuestion(data);
	}, [id]);

	useEffect(() => {
		if (id) {
			fetchQuestion();
			incrementQuestionViews(id);
		}
	}, [id, fetchQuestion, incrementQuestionViews]);

	useEffect(() => {
		setForceUpdate((f) => f + 1);
	}, [question]);

	const handleVoting = async (vote) => {
		try {
			const { data } = await api.post(`/question/${id}/${vote}`);
			if (data.name === "HttpException") {
				toast.error(data.message);
			} else {
				setQuestion(data);
				toast.success(`You ${vote}d the question!`);
			}
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	const handleAnswerSubmit = async () => {
		try {
			const { data, status } = await api.post(`/answer/create`, {
				question_id: id,
				body: answer,
			});

			if (status !== 201) {
				toast.error(data.message);
				console.log(data.message);
			} else {
				toast.success(`You answered the question!`);
				setAnswer("");
				setQuestion({
					...question,
					answers: [data.id, ...question.answers],
				});
				console.log(data);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const countVoteHandler = useCallback(() => {
		return countVote(question.votes);
	}, [question]);

	return (
		<Layout>
			{question ? (
				<div className="flex">
					<div className="w-4/5 mt-8">
						<div className="pl-10 pt-1 pb-4 border-b border-gray-300">
							<h2 className="text-3xl text-gray-title">
								{question.versions.at(-1).title}
							</h2>
							<div className="pt-1">
								<span className="text-xs text-gray-title">
									Asked{" "}
									<span className="text-gray-800 text-sm">
										{timeElapsed(question.createdAt)} ago
									</span>
								</span>
								<span className="text-xs text-gray-title pl-10">
									Viewed{" "}
									<span className="text-gray-800 text-sm">
										{question.views} {pluralize(question.views, "time")}
									</span>
								</span>
							</div>
						</div>

						<div className="pl-10 py-4 flex">
							<div className="w-1/12">
								<img
									src={upvoteSvg}
									alt="upvote"
									className="cursor-pointer"
									onClick={() => handleVoting("upvote")}
								/>
								<p className="pl-3 text-2xl text-gray-title">
									{countVoteHandler()}
								</p>
								<img
									src={downvoteSvg}
									alt="downvote"
									className="cursor-pointer"
									onClick={() => handleVoting("downvote")}
								/>
							</div>

							<div className="w-11/12">
								<h3 className=" text-gray-title text-base font-normal break-words whitespace-pre-wrap">
									{question.versions.at(-1).body}
								</h3>
								{question.versions.at(-1).user_id ? (
									<div className="flex justify-end">
										<MiniProfileWrapper
											id={question.versions.at(-1).user_id}
											key={forceUpdate}
										/>
									</div>
								) : null}
							</div>
						</div>

						<div className="pl-10 pt-10">
							<AnswerList answerIdList={question.answers} />
						</div>

						<div className="pl-10 pt-10">
							<p className="text-2xl font-normal text-gray-title">
								Your Answer
							</p>

							<textarea
								name="answer"
								rows="7"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								className="w-full border-2 border-gray-300 rounded-sm p-1 my-4 focus:outline-none focus:border-blue-dark focus:ring-1 focus:ring-blue-dark"
							/>

							<Button
								text="Post Your Answer"
								type="blue-primary"
								className="w-36 text-sm py-2"
								handleClick={() => handleAnswerSubmit()}
							/>

							<div className="text-gray-title mt-4 mb-10">
								<span>Not the answer you're looking for? Browse </span>
								<Link to="/">
									<span className="text-primary-blue">other questions </span>
								</Link>{" "}
								or
								<Link to="/ask-question">
									<span className="text-primary-blue">
										{" "}
										ask your own question
									</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-10">
						<Button
							type="blue-primary"
							text="Ask Question"
							handleClick={() => {
								history.push(`/ask-question`);
							}}
							className="text-sm"
						/>
					</div>
				</div>
			) : (
				<div>Loading ...</div>
			)}
		</Layout>
	);
}

export default connect(null, { incrementQuestionViews })(Question);
