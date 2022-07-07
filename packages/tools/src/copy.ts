import qs from 'qs';
import { isFirefox } from './browsers';
import { callInSafe } from './callInSafe';
import { callAsyncInSafe } from './callAsyncInSafe';
import { imageFileToBase64 } from './imageFileToBase64';
import { isHttps } from './isHttps';

type ExtraData = { filename?: string } & Record<string, string>;

const convertToBase64Text = '尝试将图片转换为 base64...';

/**
 * @param data - 字符串或者 png 图片
 */
export function copy(data: string): Promise<void>;
/**
 * @param data - 字符串或者 png 图片
 * @param extraData - 额外的数据，可选
 */
export function copy(data: Blob, extraData?: ExtraData): Promise<void>;
export function copy(data: Blob | string, extraData?: ExtraData) {
	return new Promise<void>(
		(resolve, reject) =>
			data instanceof Blob ? copyImage(
				data,
				resolve,
				reject,
				extraData,
			) : copyText(data, resolve, reject),
	);
}

async function copyImage(
	data: Blob,
	resolve: VoidFunction,
	reject: (error: unknown) => void,
	extraData?: ExtraData,
) {
	const type = data.type;

	if (!type.startsWith('image')) {
		return reject(new Error('无法复制非文字或非图片文件'));
	}

	if (type !== 'image/png') {
		console.log(convertToBase64Text);

		return copyImageAsBase64(data, resolve, reject);
	}

	if (!isHttps || isFirefox) {
		console.log(`非 https 环境或者用户代理为 Firefox，${convertToBase64Text}`);

		return copyImageAsBase64(data, resolve, reject);
	} else {
		return callAsyncInSafe(
			() => {
				const clipboardData = { [type]: data } as Record<string, any>;

				if (extraData) {
					const type = 'text/plain';
					clipboardData[type] = new Blob([qs.stringify(extraData)], { type });
				}

				return navigator.clipboard.write([new ClipboardItem(clipboardData)]);
			},
			reject,
		).then(resolve);
	}
}

async function copyText(
	data: string,
	resolve: VoidFunction,
	reject: (error: unknown) => void,
) {
	if (!isHttps) {
		return tryCopyTextWithExec(data, resolve, reject);
	}

	return callAsyncInSafe(
		() => navigator.clipboard.writeText(data),
		() => tryCopyTextWithExec(data, resolve, reject),
	).then(resolve);
}

function tryCopyTextWithExec(
	data: string,
	resolve: VoidFunction,
	reject: (error: unknown) => void,
) {
	return callInSafe(
		() => {
			const input = createInput(data);

			input.select();

			const result = document.execCommand('copy');

			input.remove();

			if (result) {
				resolve();
			} else {
				throw Error('复制文字失败');
			}
		},
		reject,
	);
}

function copyImageAsBase64(
	data: Blob,
	resolve: VoidFunction,
	reject: (error: unknown) => void,
) {
	return imageFileToBase64(
		data,
		(error, url = '') => {
			if (error) {
				return reject(error);
			}

			copyText(url, resolve, reject);
		},
	);
}

function createInput(data: string) {
	let input = document.createElement('input');
	const inputPos = '-9999px';

	Object.assign(
		input.style,
		{
			position: 'absolute',
			top: inputPos,
			left: inputPos,
		},
	);

	document.body.append(input);

	input.value = data;

	return {
		elem: input,
		select: () => {
			input.focus();
			input.select();
		},
		remove: () => {
			document.body.removeChild(input);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			input = null;
		},
	};
}
