import { callWithErrorCatch } from '@dz7/utils';
import { forEach } from './forEach';
import { addKey, clearKey, removeKey } from './key';
import { ls, ss } from './shared';

export function get(storage: Storage, key: string): unknown;
export function get<T>(storage: Storage, key: string, fallbackValue: T): T;
export function get<T>(storage: Storage, key: string, fallbackValue?: T) {
	let value: T | undefined;

	callWithErrorCatch(() => {
		const v = storage.getItem(key);

		if (v == null) {
			if (fallbackValue) {
				value = fallbackValue;
				set(storage, key, value);
			}
			return;
		}

		value = JSON.parse(v);
	},);

	return value;
}

export function set(storage: Storage, key: string, value: any, cb?: (error: any) => void) {
	callWithErrorCatch(
		() => {
			storage.setItem(key, JSON.stringify(value));
			addKey(storage, key);
		},
		(error) => {
			cb?.(error);
		},
	);
}

export function remove(storage: Storage, key: string) {
	storage.removeItem(key);
	removeKey(storage, key);
}

export function clear(storage: Storage) {
	forEach(storage, (_, key) => remove(storage, key));
	clearKey(storage);
}

export function clearAll() {
	clear(ls);
	clear(ss);
}
