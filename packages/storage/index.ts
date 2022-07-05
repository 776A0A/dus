import { forEach } from './forEach';
import { ls, ss } from './shared';
import { clear, clearAll, get, remove, set } from './store';

type GetDataFn = <T>(
	key: string,
	fallbackValue?: T,
	cb?: (error: any) => void,
) => T | undefined;

const session = {
	get: get.bind(null, ss) as GetDataFn,
	set: set.bind(null, ss),
	remove: remove.bind(null, ss),
	clear: clear.bind(null, ss),
	forEach: forEach.bind(null, ss),
};

const storage = {
	get: get.bind(null, ls) as GetDataFn, // bind后泛型消失了，所以使用类型断言
	set: set.bind(null, ls),
	remove: remove.bind(null, ls),
	clear: clear.bind(null, ls),
	forEach: forEach.bind(null, ls),
	session,
	clearAll,
};

export default storage;
