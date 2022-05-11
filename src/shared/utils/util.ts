export const getDateWithTimeZone = (utcDateString: string): string => {
	const offset = new Date().getTimezoneOffset();
	const utcTime = new Date(utcDateString).getTime();
	const dateWithOffset = new Date(utcTime + 3600000 * offset);
	return dateWithOffset.toLocaleString();
};
