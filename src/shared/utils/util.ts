export const getDateWithTimeZone = (utcDateString: string): string => {
	const offset = new Date().getTimezoneOffset();
	const utcTime = new Date(utcDateString).getTime();
	const dateWithOffset = new Date(utcTime + 3600000 * offset);
	return dateWithOffset.toLocaleString();
};

export const groupBy = (xs: any[], key: string) => {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, []);
};
