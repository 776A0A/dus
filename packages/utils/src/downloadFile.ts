import { getFilenameFromHeader } from './getFilenameFromHeader';

const defaultFilename = '文件';

type Filename = string | (() => string);

export async function downloadFile(file: Blob, filename: Filename): Promise<
	void
>;
export async function downloadFile(file: string, filename?: Filename): Promise<
	void
>;
export async function downloadFile(file: Blob | string, filename?: Filename) {
	let a = document.createElement('a');

	let blob: Blob, finalFilename = getFilename(filename);

	if (typeof file === 'string') {
		const result = await getBlob(file);

		blob = result.blob;

		if (finalFilename === defaultFilename) {
			finalFilename = result.filename ?? defaultFilename;
		}
	} else {
		blob = file;
	}

	const url = window.URL.createObjectURL(blob);

	void (
		[['href', url], ['download', finalFilename], ['target', '_blank']] as const
	).forEach(([attr, val]) => a.setAttribute(attr, val));

	a.click();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	a = null;

	window.URL.revokeObjectURL(url);
}

function getFilename(filename: Filename | undefined) {
	return typeof filename === 'function'
		? filename()
		: typeof filename === 'string'
			? filename
			: defaultFilename;
}

async function getBlob(file: string) {
	let filename: string | undefined | null;

	const blob = await fetch(file).then(
		(res) =>
			res
				.blob()
				.then((blob) => {
					filename =
						getFilenameFromHeader(
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							Object.fromEntries(res.headers.entries()),
						);
					return blob;
				},)
				.catch(() => tryCreateIFrame(file)),
	);

	return { blob: blob, filename };
}

function tryCreateIFrame(maybeURL: string) {
	let params: [BlobPart[], BlobPropertyBag] = [
		[maybeURL],
		{ type: 'text/plain;charset=utf-8' /* 纯文本 */ },
	];

	if (/^https?:\/\//.test(maybeURL)) {
		params = [[getIframeHTML(maybeURL)], { type: 'text/html' /* iframe */ }];
	}

	return new window.Blob(...params);
}

function getIframeHTML(url: string) {
	return `
  <html>
    <body style="margin:0px;">
      <iframe src=${url} frameborder="0" style="height:100vh;width:100vw;border:none;margin:0px;"></iframe>
    </body>
  </html>
  `;
}
