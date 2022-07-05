/**
 * 将blob转化为base64字符串
 * @param {Blob} img - 图像对象
 * @param callback - 转换完后的回调函数
 */
export function imageFileToBase64(
	img: Blob,
	callback: (error: ProgressEvent<FileReader> | null, url?: string) => void,
) {
	const reader = new FileReader();

	reader.addEventListener(
		'load',
		() => callback(null, reader.result as string),
	);
	reader.addEventListener('error', (error) => callback(error));

	reader.readAsDataURL(img);
}
