export function imageToBase64(image: HTMLImageElement) {
	const canvas = document.createElement('canvas');

	canvas.width = image.naturalWidth || image.width;
	canvas.height = image.naturalHeight || image.height;

	const ctx = canvas.getContext('2d');

	image.crossOrigin = 'Anonymous';

	ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

	return canvas.toDataURL('image/png');
}
