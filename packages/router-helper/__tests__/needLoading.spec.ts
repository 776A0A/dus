import { needLoading } from '../utils';

const startLocation = { matched: [{ path: '/' }] };

jest.mock(
	'vue-router',
	() => {
		const original = jest.requireActual('vue-router');
		return {
			__esModule: true,
			...original,
			START_LOCATION: startLocation,
		};
	},
);

describe(
	'needLoading',
	() => {
		it(
			'should return true when a router just started',
			() => {
				expect(needLoading({ matched: [{ path: '/' }] } as any, startLocation as any)).toBe(true);
			},
		);

		it(
			'should return true when the path changed',
			() => {
				expect(
					needLoading({ matched: [{ path: '/' }] } as any, { matched: [{ path: '/a' }] } as any),
				).toBe(true);
			},
		);

		it(
			'should return false when only query changes',
			() => {
				expect(
					needLoading({ matched: [{ path: '/' }] } as any, { matched: [{ path: '/' }] } as any),
				).toBe(false);
			},
		);
	},
);
