import { ls, sessionStorageKey, storageKey } from './shared';
import { get } from './store';

export function addKey(storage: Storage, key: string) {
	const keys = getKeys(storage);

	if (keys.includes(key)) {
		return;
	}

	keys.push(key);

	storage.setItem(getStorageKey(storage), JSON.stringify(keys));
}

export function removeKey(storage: Storage, key: string) {
	let keys = getKeys(storage);

	keys = keys.filter((_key) => _key !== key);

	storage.setItem(getStorageKey(storage), JSON.stringify(keys));
}

export function clearKey(storage: Storage) {
	storage.removeItem(getStorageKey(storage));
}

export function getKeys(storage: Storage) {
	return get(storage, getStorageKey(storage), [] as string[]);
}

function getStorageKey(storage: Storage) {
	return storage === ls ? storageKey : sessionStorageKey;
}
