type ErrorHandler = (error: string | Event | null, file?: File) => void;

export function urlToFile(url: string): Promise<File>;
export function urlToFile(url: string, callback: ErrorHandler): void;
export function urlToFile(url: string, callback?: ErrorHandler) {
	const getMimeType = (res: Response) => {
		return res.headers.get('content-type') ?? 'image/png';
	};
	const createFile = (blob: Blob, type: string) => {
		return new File([blob], `图片.${type.split('/')[1] ?? 'png'}`, { type });
	};

	if (callback) {
		fetch(url).then(
			(res) =>
				res
					.blob()
					.then((blob) => callback(null, createFile(blob, getMimeType(res))))
					.catch((error) => callback(error)),
		);

		return;
	}

	return fetch(url).then((res) => res.blob().then((blob) => createFile(blob, getMimeType(res))));
}
