import { toast as toastLib } from "react-toastify";

const style = {
	success: {
		className: "!bg-green-100 !shadow-xl !text-base",
	},
	error: {
		className: "!bg-red-100 !shadow-xl !text-base",
	},
	info: {
		className: "!bg-blue-100 !shadow-xl !text-base",
	},
	warning: {
		className: "!bg-orange-100 !shadow-xl !text-base",
	},
};

const toast = {
	success: (message) => toastLib.success(message, style.success),
	error: (message) => toastLib.error(message, style.error),
	info: (message) => toastLib.info(message, style.info),
	warning: (message) => toastLib.warning(message, style.warning),
};

export default toast;
