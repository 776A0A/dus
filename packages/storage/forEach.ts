import { getKeys } from './key';
import { get } from './store';

export function forEach(storage: Storage, cb: (value: any, key: string, idx: number) => void) {
	const keys = getKeys(storage);

	if (!keys.length) {
		return;
	}

	keys.forEach((key, idx) => {
		const value = get(storage, key);

		cb(value, key, idx);
	},);
}
