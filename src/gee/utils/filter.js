module.exports = (obj, predicate) => {
	const result = {};

	for (const key in obj) {
		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	}

	return result;
};
