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
