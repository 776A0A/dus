import { NavigationGuard, NavigationHookAfter, RouteLocationNormalized } from 'vue-router';
import { needLoading } from './utils';

interface Options {
	/**
   * @default true
   */
	redirect: boolean;
	loginPath: string;
	homePath: string;
	isLogin: () => boolean;
	getAuthList: () => boolean;
	onNoAuthList: (to: RouteLocationNormalized) => ReturnType<NavigationGuard>;
}

type PartialOptions = PartialPart<Options, 'redirect'>;

class RouterGuards {
	private _options: Options;

	constructor(options: PartialOptions) {
		this._options =
			Object.assign(
				{
					redirect: true,
				},
				options,
			);
	}

	beforeEach: NavigationGuard = (to, from) => {
		// eslint-disable-next-line no-empty
		if (needLoading(to, from)) {
		}

		const redirect = this._options.redirect;

		// 未登录，本地没有任何登录信息
		if (!this._options.isLogin()) {
			if (!this._isInLoginPage(to.path)) {
				return {
					path: this._options.loginPath,
					query:
						redirect && to.fullPath ? {
							redirect: encodeURIComponent(to.fullPath),
						} : {},
				};
			}
		} else {
			if (this._isInLoginPage(to.path)) {
				return { path: this._options.homePath };
			}

			if (!this._options.getAuthList()) {
				return this._options.onNoAuthList(to);
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	afterEach: NavigationHookAfter = () => {};

	private _isInLoginPage = (path: string) => path === this._options.loginPath;
}

export function createGuards(options: PartialOptions) {
	return new RouterGuards(options);
}
