export async function requestParallel(
	params: {
		parallel: number;
		total: number;
		request: (idx: number) => Promise<void>;
	},
) {
	const { parallel, total, request } = params;

	return new Promise<void>((resolve) => {
		let frees = parallel ?? 0;
		let idx = 0;
		let counter = 0;
		const len = total;

		const start = () => {
			while (frees > 0 && idx < len) {
				frees--;
				request(idx++).then(() => {
					frees++;
					counter++;
					if (counter === len) {
						resolve();
					} else {
						start();
					}
				},);
			}
		};

		start();
	},);
}
