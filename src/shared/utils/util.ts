export const getDateWithTimeZone = (utcDateString: string): string => {
	const utc = new Date(utcDateString);
	return utc.toLocaleString();
};

export const groupBy = (xs: any[], key: string) => {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, []);
};

export const getStatus = (s: string) => {
	switch (s) {
		case 'Not Started':
			return 0;
		case 'In Progress':
			return 1;
		case 'Finished':
			return 2;
		default:
			return 0;
	}
};
