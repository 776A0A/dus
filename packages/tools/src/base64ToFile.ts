export function base64ToFile(url: string, filename = '图片') {
	const arr = url.split(',');
	const bstr = window.atob(arr[1]);

	let length = bstr.length;
	const u8arr = new Uint8Array(length);

	while (length--) {
		u8arr[length] = bstr.charCodeAt(length);
	}

	const type = url.match(/^data:image\/(.+);base64,.+/)?.[1] ?? 'png';

	return new File([u8arr], `${filename}.${type}`, { type: `image/${type}` });
}
