import debounce from 'lodash.debounce';
import { reload } from './reload';

/**
 * push 一个路由并刷新页面
 * @param [url] - 路径
 */
export const pushAndReload = debounce(
	(url = '') => {
		location.assign(`${url}`);

		// chrome有bug，在firefox中完全正常，在chrome中有时url不会改变
		if (location.href !== url) {
			location.href = url;
		}
		if (location.href !== url) {
			window.location = url;
		}

		setTimeout(reload, 10);
	},
	30,
);
