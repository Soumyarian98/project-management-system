export const toCamelCase = (obj: any) => {
	return Object.keys(obj).reduce((acc, key) => {
		const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
		// @ts-ignore
		acc[camelKey] = obj[key];
		return acc;
	}, {});
};
