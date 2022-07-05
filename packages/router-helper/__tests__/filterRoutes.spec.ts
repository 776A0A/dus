import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { OA, TA } from '../constants';
import { filterRoutes } from '../filterRoutes';

const root = { name: 'root', path: '/' };
const a = { name: 'a', path: '/a' };
const b = { name: 'b', path: '/b' };
const meta = { ...OA };

describe(
	'RoutesBuilder',
	() => {
		it(
			'不需要权限的路由不会被删除',
			() => {
				const { getLength } = factory([root, a], [b.path]);

				expect(getLength()).toBe(2);
			},
		);

		it(
			'正确删除没有权限的路由',
			() => {
				const { getLength } = factory([root, { ...a, meta }], [b.path]);

				expect(getLength()).toBe(1);
			},
		);

		it(
			'当权限路由为空时，删除所有需要权限的路由',
			() => {
				const { getLength } = factory([root, { ...a, meta }, { ...b, meta }]);

				expect(getLength()).toBe(1);
			},
		);

		it(
			'正确删除二级的无权限路由',
			() => {
				const { getLength } = factory([{ ...a, children: [{ ...b, meta }] }], [a.path]);

				expect(getLength()).toBe(1);
			},
		);

		it(
			'当父级没有权限，子路由就算有权限也会被删除',
			() => {
				const { getLength } = factory([{ ...root, meta, children: [a, b] }], [a.path, b.path]);

				expect(getLength()).toBe(0);
			},
		);

		it(
			'当父级有权限，子路由不会被删除',
			() => {
				const { getLength } = factory([{ ...root, meta, children: [a, b] }], [root.path]);

				expect(getLength()).toBe(3);
			},
		);

		it(
			'正确删除多层嵌套的无权限路由',
			() => {
				const { getLength } = factory(
					[{ ...root, children: [{ ...a, meta, children: [{ ...b, meta }] }] }],
					[a.path],
				);

				expect(getLength()).toBe(2);
			},
		);

		it(
			'如果 temporary allow 为 true，那么就算没有权限也不会被删除',
			() => {
				const { getLength } = factory([{ ...a, meta: { ...meta, [TA]: true } }], [b.path]);

				expect(getLength()).toBe(1);
			},
		);

		it(
			'customFilter 返回 true，不删除相关路由',
			() => {
				const { getLength } = factory([{ ...a, meta }], [b.path], () => true);

				expect(getLength()).toBe(1);
			},
		);

		it(
			'customFilter 返回 false，删除相关路由',
			() => {
				const { getLength } = factory([{ ...a, meta }], [a.path], () => false);

				expect(getLength()).toBe(0);
			},
		);

		it(
			'customFilter 返回 undefined，交给默认逻辑处理',
			() => {
				const { getLength } = factory([{ ...a, meta }, b], [a.path], () => undefined);

				expect(getLength()).toBe(2);
			},
		);
	},
);

function factory(routes: any[], reachables = [] as string[], filter?: () => boolean | undefined) {
	const router = createRouter({
		routes,
		history: createWebHistory(),
	},);

	filterRoutes(router, routes, reachables, filter);

	const getRoutes = () => router.getRoutes();
	const getLength = () => getRoutes().length;

	return { router, getRoutes, getLength };
}
