import { useEffect, useState } from "react";
import api from "../../services/api";
import { pluralize } from "../../utils/common";
import Answer from "./answer";

function AnswerList({ answerIdList }) {
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		let isSubscribed = true;

		async function fetchAnswers() {
			const tempAnswers = await Promise.all(
				answerIdList.map(async (answerId) => {
					const { data } = await api.get(`/answer/${answerId}`);
					return data;
				})
			);
			if (isSubscribed) {
				setAnswers(tempAnswers);
			}
		}

		fetchAnswers();
		return () => (isSubscribed = false);
	}, [answerIdList]);

	return (
		<div>
			<p className="text-gray-title text-xl pl-2">
				{answers.length + pluralize(answers.length, " answer")}
			</p>

			{answers.map((answer) => (
				<Answer key={answer.id} initalData={answer} />
			))}
		</div>
	);
}

export default AnswerList;
