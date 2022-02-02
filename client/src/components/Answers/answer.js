import MiniProfileWrapper from "../Profile/mini-profile-wrapper";
import downvoteSvg from "../../assets/svg/downvote.svg";
import upvoteSvg from "../../assets/svg/upvote.svg";
import { useCallback, useEffect, useState } from "react";
import { countVote } from "../../utils/common";
import api from "../../services/api";
import toast from "../../utils/toast";

function Answer({ initalData }) {
	const [answer, setAnswer] = useState(initalData);
	const [forceUpdate, setForceUpdate] = useState(0);

	const countVoteHandler = useCallback(() => {
		return countVote(answer.votes);
	}, [answer]);

	const handleVoting = async (vote) => {
		try {
			const { data } = await api.post(`/answer/${answer.id}/${vote}`);
			if (data.name === "HttpException") {
				toast.error(data.message);
			} else {
				setAnswer(data);
				toast.success(`You ${vote}d the answer!`);
			}
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		setForceUpdate((f) => f + 1);
	}, [answer]);

	return (
		<div>
			{answer ? (
				<div className="flex py-4 border-b border-gray-300">
					<div className="w-1/12">
						<img
							src={upvoteSvg}
							alt="upvote"
							className="cursor-pointer"
							onClick={() => handleVoting("upvote")}
						/>
						<p className="pl-3 text-2xl text-gray-title">
							{countVoteHandler(answer.votes)}
						</p>
						<img
							src={downvoteSvg}
							alt="downvote"
							className="cursor-pointer"
							onClick={() => handleVoting("downvote")}
						/>
					</div>
					<div className="w-11/12 ">
						<div className="text-gray-title text-base font-normal break-words whitespace-pre-wrap">
							{answer.versions.at(-1).body}
						</div>
						<div className="flex justify-end -mt-12">
							<MiniProfileWrapper
								id={answer.versions.at(-1).user_id}
								isAnswered={true}
								key={forceUpdate}
							/>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Answer;
