import sparkMD5 from "spark-md5";

const sizeobj = {
	tiny: "33",
	small: "90",
	medium: "180",
	large: "360",
};

export const getAvatar = (email, size = "small") => {
	return `https://www.gravatar.com/avatar/" +
		${sparkMD5.hash(email)} +
		"?s=${sizeobj[size]}&d=identicon`;
};

export const pluralize = (count, word) => {
	return count <= 1 ? word : word + "s";
};

export const countVote = (votes) => {
	return votes.reduce((acc, vote) => {
		if (vote.action) {
			return acc + 1;
		} else {
			return acc - 1;
		}
	}, 0);
};
