var at = Object.defineProperty;
var ct = (e, t, r) => (t in e ? at(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var w = (e, t, r) => (ct(e, typeof t != 'symbol' ? t + '' : t, r), r),
	ne = (e, t, r) => {
		if (!t.has(e)) throw TypeError('Cannot ' + r);
	};
var B = (e, t, r) => (ne(e, t, 'read from private field'), r ? r.call(e) : t.get(e)),
	oe = (e, t, r) => {
		if (t.has(e)) throw TypeError('Cannot add the same private member more than once');
		t instanceof WeakSet ? t.add(e) : t.set(e, r);
	},
	ye = (e, t, r, s) => (ne(e, t, 'write to private field'), s ? s.call(e, r) : t.set(e, r), r);
var J = (e, t, r) => (ne(e, t, 'access private method'), r);
import { s as lt } from './index-ByUk5sbk.js';
var ut = /(%?)(%([sdijo]))/g;
function dt(e, t) {
	switch (t) {
		case 's':
			return e;
		case 'd':
		case 'i':
			return Number(e);
		case 'j':
			return JSON.stringify(e);
		case 'o': {
			if (typeof e == 'string') return e;
			const r = JSON.stringify(e);
			return r === '{}' || r === '[]' || /^\[object .+?\]$/.test(r) ? e : r;
		}
	}
}
function fe(e, ...t) {
	if (t.length === 0) return e;
	let r = 0,
		s = e.replace(ut, (n, o, i, l) => {
			const a = t[r],
				c = dt(a, l);
			return o ? n : (r++, c);
		});
	return r < t.length && (s += ` ${t.slice(r).join(' ')}`), (s = s.replace(/%{2,2}/g, '%')), s;
}
var ft = 2;
function ht(e) {
	if (!e.stack) return;
	const t = e.stack.split(`
`);
	t.splice(1, ft),
		(e.stack = t.join(`
`));
}
var pt = class extends Error {
		constructor(t, ...r) {
			super(t), (this.message = t), (this.name = 'Invariant Violation'), (this.message = fe(t, ...r)), ht(this);
		}
	},
	V = (e, t, ...r) => {
		if (!e) throw new pt(t, ...r);
	};
V.as = (e, t, r, ...s) => {
	if (!t) {
		const n = s.length === 0 ? r : fe(r, s);
		let o;
		try {
			o = Reflect.construct(e, [n]);
		} catch {
			o = e(n);
		}
		throw o;
	}
};
const gt = '[MSW]';
function he(e, ...t) {
	const r = fe(e, ...t);
	return `${gt} ${r}`;
}
function yt(e, ...t) {
	console.warn(he(e, ...t));
}
function mt(e, ...t) {
	console.error(he(e, ...t));
}
const b = { formatMessage: he, warn: yt, error: mt },
	vt = /[\/\\]msw[\/\\]src[\/\\](.+)/,
	wt = /(node_modules)?[\/\\]lib[\/\\](core|browser|node|native|iife)[\/\\]|^[^\/\\]*$/;
function bt(e) {
	const t = e.stack;
	if (!t) return;
	const s = t
		.split(
			`
`
		)
		.slice(1)
		.find(o => !(vt.test(o) || wt.test(o)));
	return s ? s.replace(/\s*at [^()]*\(([^)]+)\)/, '$1').replace(/^@/, '') : void 0;
}
function kt(e) {
	return e ? typeof e[Symbol.iterator] == 'function' : !1;
}
const K = class K {
	constructor(t) {
		w(this, 'info');
		w(this, 'isUsed');
		w(this, 'resolver');
		w(this, 'resolverGenerator');
		w(this, 'resolverGeneratorResult');
		w(this, 'options');
		(this.resolver = t.resolver), (this.options = t.options);
		const r = bt(new Error());
		(this.info = { ...t.info, callFrame: r }), (this.isUsed = !1);
	}
	async parse(t) {
		return {};
	}
	async test(t) {
		const r = await this.parse({ request: t.request, resolutionContext: t.resolutionContext });
		return this.predicate({ request: t.request, parsedResult: r, resolutionContext: t.resolutionContext });
	}
	extendResolverArgs(t) {
		return {};
	}
	cloneRequestOrGetFromCache(t) {
		const r = K.cache.get(t);
		if (typeof r < 'u') return r;
		const s = t.clone();
		return K.cache.set(t, s), s;
	}
	async run(t) {
		var u, f;
		if (this.isUsed && (u = this.options) != null && u.once) return null;
		const r = this.cloneRequestOrGetFromCache(t.request),
			s = await this.parse({ request: t.request, resolutionContext: t.resolutionContext });
		if (
			!this.predicate({ request: t.request, parsedResult: s, resolutionContext: t.resolutionContext }) ||
			(this.isUsed && (f = this.options) != null && f.once)
		)
			return null;
		this.isUsed = !0;
		const o = this.wrapResolver(this.resolver),
			i = this.extendResolverArgs({ request: t.request, parsedResult: s }),
			a = await o({ ...i, requestId: t.requestId, request: t.request }).catch(d => {
				if (d instanceof Response) return d;
				throw d;
			});
		return this.createExecutionResult({ request: r, requestId: t.requestId, response: a, parsedResult: s });
	}
	wrapResolver(t) {
		return async r => {
			const s = this.resolverGenerator || (await t(r));
			if (kt(s)) {
				this.isUsed = !1;
				const { value: n, done: o } = s[Symbol.iterator]().next(),
					i = await n;
				return (
					o && (this.isUsed = !0),
					!i && o
						? (V(
								this.resolverGeneratorResult,
								'Failed to returned a previously stored generator response: the value is not a valid Response.'
							),
							this.resolverGeneratorResult.clone())
						: (this.resolverGenerator || (this.resolverGenerator = s),
							i && (this.resolverGeneratorResult = i == null ? void 0 : i.clone()),
							i)
				);
			}
			return s;
		};
	}
	createExecutionResult(t) {
		return { handler: this, request: t.request, requestId: t.requestId, response: t.response, parsedResult: t.parsedResult };
	}
};
w(K, 'cache', new WeakMap());
let Q = K;
var At = async e => {
	try {
		return {
			error: null,
			data: await e().catch(r => {
				throw r;
			}),
		};
	} catch (t) {
		return { error: t, data: null };
	}
};
const Et = async ({ request: e, requestId: t, handlers: r, resolutionContext: s }) => {
	let n = null,
		o = null;
	for (const i of r)
		if (((o = await i.run({ request: e, requestId: t, resolutionContext: s })), o !== null && (n = i), o != null && o.response)) break;
	return n ? { handler: n, parsedResult: o == null ? void 0 : o.parsedResult, response: o == null ? void 0 : o.response } : null;
};
function Oe(e) {
	if (typeof location > 'u') return e.toString();
	const t = e instanceof URL ? e : new URL(e);
	return t.origin === location.origin ? t.pathname : t.origin + t.pathname;
}
async function xt(e, t = 'warn') {
	const r = new URL(e.url),
		s = Oe(r),
		n = `intercepted a request without a matching request handler:

  • ${e.method} ${s}

If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks`;
	function o(i) {
		switch (i) {
			case 'error':
				throw (
					(b.error('Error: %s', n),
					new Error(b.formatMessage('Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.')))
				);
			case 'warn': {
				b.warn('Warning: %s', n);
				break;
			}
			case 'bypass':
				break;
			default:
				throw new Error(
					b.formatMessage(
						'Failed to react to an unhandled request: unknown strategy "%s". Please provide one of the supported strategies ("bypass", "warn", "error") or a custom callback function as the value of the "onUnhandledRequest" option.',
						i
					)
				);
		}
	}
	if (typeof t == 'function') {
		t(e, { warning: o.bind(null, 'warn'), error: o.bind(null, 'error') });
		return;
	}
	r.protocol !== 'file:' && o(t);
}
var Lt = Object.create,
	Ce = Object.defineProperty,
	St = Object.getOwnPropertyDescriptor,
	_e = Object.getOwnPropertyNames,
	Rt = Object.getPrototypeOf,
	Pt = Object.prototype.hasOwnProperty,
	Tt = (e, t) =>
		function () {
			return t || (0, e[_e(e)[0]])((t = { exports: {} }).exports, t), t.exports;
		},
	Ot = (e, t, r, s) => {
		if ((t && typeof t == 'object') || typeof t == 'function')
			for (let n of _e(t)) !Pt.call(e, n) && n !== r && Ce(e, n, { get: () => t[n], enumerable: !(s = St(t, n)) || s.enumerable });
		return e;
	},
	Ct = (e, t, r) => (
		(r = e != null ? Lt(Rt(e)) : {}), Ot(t || !e || !e.__esModule ? Ce(r, 'default', { value: e, enumerable: !0 }) : r, e)
	),
	_t = Tt({
		'node_modules/set-cookie-parser/lib/set-cookie.js'(e, t) {
			var r = { decodeValues: !0, map: !1, silent: !1 };
			function s(a) {
				return typeof a == 'string' && !!a.trim();
			}
			function n(a, c) {
				var u = a.split(';').filter(s),
					f = u.shift(),
					d = o(f),
					p = d.name,
					g = d.value;
				c = c ? Object.assign({}, r, c) : r;
				try {
					g = c.decodeValues ? decodeURIComponent(g) : g;
				} catch (y) {
					console.error(
						"set-cookie-parser encountered an error while decoding a cookie with value '" +
							g +
							"'. Set options.decodeValues to false to disable this feature.",
						y
					);
				}
				var h = { name: p, value: g };
				return (
					u.forEach(function (y) {
						var m = y.split('='),
							k = m.shift().trimLeft().toLowerCase(),
							x = m.join('=');
						k === 'expires'
							? (h.expires = new Date(x))
							: k === 'max-age'
								? (h.maxAge = parseInt(x, 10))
								: k === 'secure'
									? (h.secure = !0)
									: k === 'httponly'
										? (h.httpOnly = !0)
										: k === 'samesite'
											? (h.sameSite = x)
											: (h[k] = x);
					}),
					h
				);
			}
			function o(a) {
				var c = '',
					u = '',
					f = a.split('=');
				return f.length > 1 ? ((c = f.shift()), (u = f.join('='))) : (u = a), { name: c, value: u };
			}
			function i(a, c) {
				if (((c = c ? Object.assign({}, r, c) : r), !a)) return c.map ? {} : [];
				if (a.headers)
					if (typeof a.headers.getSetCookie == 'function') a = a.headers.getSetCookie();
					else if (a.headers['set-cookie']) a = a.headers['set-cookie'];
					else {
						var u =
							a.headers[
								Object.keys(a.headers).find(function (d) {
									return d.toLowerCase() === 'set-cookie';
								})
							];
						!u &&
							a.headers.cookie &&
							!c.silent &&
							console.warn(
								'Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.'
							),
							(a = u);
					}
				if ((Array.isArray(a) || (a = [a]), (c = c ? Object.assign({}, r, c) : r), c.map)) {
					var f = {};
					return a.filter(s).reduce(function (d, p) {
						var g = n(p, c);
						return (d[g.name] = g), d;
					}, f);
				} else
					return a.filter(s).map(function (d) {
						return n(d, c);
					});
			}
			function l(a) {
				if (Array.isArray(a)) return a;
				if (typeof a != 'string') return [];
				var c = [],
					u = 0,
					f,
					d,
					p,
					g,
					h;
				function y() {
					for (; u < a.length && /\s/.test(a.charAt(u)); ) u += 1;
					return u < a.length;
				}
				function m() {
					return (d = a.charAt(u)), d !== '=' && d !== ';' && d !== ',';
				}
				for (; u < a.length; ) {
					for (f = u, h = !1; y(); )
						if (((d = a.charAt(u)), d === ',')) {
							for (p = u, u += 1, y(), g = u; u < a.length && m(); ) u += 1;
							u < a.length && a.charAt(u) === '=' ? ((h = !0), (u = g), c.push(a.substring(f, p)), (f = u)) : (u = p + 1);
						} else u += 1;
					(!h || u >= a.length) && c.push(a.substring(f, a.length));
				}
				return c;
			}
			(t.exports = i), (t.exports.parse = i), (t.exports.parseString = n), (t.exports.splitCookiesString = l);
		},
	}),
	me = Ct(_t()),
	H = 'MSW_COOKIE_STORE';
function ve() {
	try {
		if (localStorage == null) return !1;
		const e = H + '_test';
		return localStorage.setItem(e, 'test'), localStorage.getItem(e), localStorage.removeItem(e), !0;
	} catch {
		return !1;
	}
}
function we(e, t) {
	try {
		return e[t], !0;
	} catch {
		return !1;
	}
}
var Wt = class {
		constructor() {
			this.store = new Map();
		}
		add(e, t) {
			if (we(e, 'credentials') && e.credentials === 'omit') return;
			const r = new URL(e.url),
				s = t.headers.get('set-cookie');
			if (!s) return;
			const n = Date.now(),
				o = (0, me.parse)(s).map(({ maxAge: l, ...a }) => ({ ...a, expires: l === void 0 ? a.expires : new Date(n + l * 1e3), maxAge: l })),
				i = this.store.get(r.origin) || new Map();
			o.forEach(l => {
				this.store.set(r.origin, i.set(l.name, l));
			});
		}
		get(e) {
			this.deleteExpiredCookies();
			const t = new URL(e.url),
				r = this.store.get(t.origin) || new Map();
			if (!we(e, 'credentials')) return r;
			switch (e.credentials) {
				case 'include':
					return (
						typeof document > 'u' ||
							(0, me.parse)(document.cookie).forEach(n => {
								r.set(n.name, n);
							}),
						r
					);
				case 'same-origin':
					return r;
				default:
					return new Map();
			}
		}
		getAll() {
			return this.deleteExpiredCookies(), this.store;
		}
		deleteAll(e) {
			const t = new URL(e.url);
			this.store.delete(t.origin);
		}
		clear() {
			this.store.clear();
		}
		hydrate() {
			if (!ve()) return;
			const e = localStorage.getItem(H);
			if (e)
				try {
					JSON.parse(e).forEach(([r, s]) => {
						this.store.set(r, new Map(s.map(([n, { expires: o, ...i }]) => [n, o === void 0 ? i : { ...i, expires: new Date(o) }])));
					});
				} catch (t) {
					console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${H}").

Stored value:
${localStorage.getItem(H)}

Thrown exception:
${t}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`),
						localStorage.removeItem(H);
				}
		}
		persist() {
			if (!ve()) return;
			const e = Array.from(this.store.entries()).map(([t, r]) => [t, Array.from(r.entries())]);
			localStorage.setItem(H, JSON.stringify(e));
		}
		deleteExpiredCookies() {
			const e = Date.now();
			this.store.forEach((t, r) => {
				t.forEach(({ expires: s, name: n }) => {
					s !== void 0 && s.getTime() <= e && t.delete(n);
				}),
					t.size === 0 && this.store.delete(r);
			});
		}
	},
	Z = new Wt();
function Mt(e, t) {
	Z.add({ ...e, url: e.url.toString() }, t), Z.persist();
}
async function We(e, t, r, s, n, o) {
	var u, f, d, p, g, h;
	if ((n.emit('request:start', { request: e, requestId: t }), e.headers.get('x-msw-intention') === 'bypass')) {
		n.emit('request:end', { request: e, requestId: t }), (u = o == null ? void 0 : o.onPassthroughResponse) == null || u.call(o, e);
		return;
	}
	const i = await At(() => Et({ request: e, requestId: t, handlers: r, resolutionContext: o == null ? void 0 : o.resolutionContext }));
	if (i.error) throw (n.emit('unhandledException', { error: i.error, request: e, requestId: t }), i.error);
	if (!i.data) {
		await xt(e, s.onUnhandledRequest),
			n.emit('request:unhandled', { request: e, requestId: t }),
			n.emit('request:end', { request: e, requestId: t }),
			(f = o == null ? void 0 : o.onPassthroughResponse) == null || f.call(o, e);
		return;
	}
	const { response: l } = i.data;
	if (!l) {
		n.emit('request:end', { request: e, requestId: t }), (d = o == null ? void 0 : o.onPassthroughResponse) == null || d.call(o, e);
		return;
	}
	if (l.status === 302 && l.headers.get('x-msw-intention') === 'passthrough') {
		n.emit('request:end', { request: e, requestId: t }), (p = o == null ? void 0 : o.onPassthroughResponse) == null || p.call(o, e);
		return;
	}
	Mt(e, l), n.emit('request:match', { request: e, requestId: t });
	const a = i.data,
		c = ((g = o == null ? void 0 : o.transformResponse) == null ? void 0 : g.call(o, l)) || l;
	return (h = o == null ? void 0 : o.onMockedResponse) == null || h.call(o, c, a), n.emit('request:end', { request: e, requestId: t }), c;
}
function qt(e) {
	return { status: e.status, statusText: e.statusText, headers: Object.fromEntries(e.headers.entries()) };
}
function be(e) {
	return e != null && typeof e == 'object' && !Array.isArray(e);
}
function Me(e, t) {
	return Object.entries(t).reduce(
		(r, [s, n]) => {
			const o = r[s];
			return Array.isArray(o) && Array.isArray(n) ? ((r[s] = o.concat(n)), r) : be(o) && be(n) ? ((r[s] = Me(o, n)), r) : ((r[s] = n), r);
		},
		Object.assign({}, e)
	);
}
var It = class extends Error {
		constructor(t, r, s) {
			super(
				`Possible EventEmitter memory leak detected. ${s} ${r.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`
			),
				(this.emitter = t),
				(this.type = r),
				(this.count = s),
				(this.name = 'MaxListenersExceededWarning');
		}
	},
	qe = class {
		static listenerCount(t, r) {
			return t.listenerCount(r);
		}
		constructor() {
			(this.events = new Map()), (this.maxListeners = qe.defaultMaxListeners), (this.hasWarnedAboutPotentialMemoryLeak = !1);
		}
		_emitInternalEvent(t, r, s) {
			this.emit(t, r, s);
		}
		_getListeners(t) {
			return Array.prototype.concat.apply([], this.events.get(t)) || [];
		}
		_removeListener(t, r) {
			const s = t.indexOf(r);
			return s > -1 && t.splice(s, 1), [];
		}
		_wrapOnceListener(t, r) {
			const s = (...n) => (this.removeListener(t, s), r.apply(this, n));
			return Object.defineProperty(s, 'name', { value: r.name }), s;
		}
		setMaxListeners(t) {
			return (this.maxListeners = t), this;
		}
		getMaxListeners() {
			return this.maxListeners;
		}
		eventNames() {
			return Array.from(this.events.keys());
		}
		emit(t, ...r) {
			const s = this._getListeners(t);
			return (
				s.forEach(n => {
					n.apply(this, r);
				}),
				s.length > 0
			);
		}
		addListener(t, r) {
			this._emitInternalEvent('newListener', t, r);
			const s = this._getListeners(t).concat(r);
			if (
				(this.events.set(t, s),
				this.maxListeners > 0 && this.listenerCount(t) > this.maxListeners && !this.hasWarnedAboutPotentialMemoryLeak)
			) {
				this.hasWarnedAboutPotentialMemoryLeak = !0;
				const n = new It(this, t, this.listenerCount(t));
				console.warn(n);
			}
			return this;
		}
		on(t, r) {
			return this.addListener(t, r);
		}
		once(t, r) {
			return this.addListener(t, this._wrapOnceListener(t, r));
		}
		prependListener(t, r) {
			const s = this._getListeners(t);
			if (s.length > 0) {
				const n = [r].concat(s);
				this.events.set(t, n);
			} else this.events.set(t, s.concat(r));
			return this;
		}
		prependOnceListener(t, r) {
			return this.prependListener(t, this._wrapOnceListener(t, r));
		}
		removeListener(t, r) {
			const s = this._getListeners(t);
			return s.length > 0 && (this._removeListener(s, r), this.events.set(t, s), this._emitInternalEvent('removeListener', t, r)), this;
		}
		off(t, r) {
			return this.removeListener(t, r);
		}
		removeAllListeners(t) {
			return t ? this.events.delete(t) : this.events.clear(), this;
		}
		listeners(t) {
			return Array.from(this._getListeners(t));
		}
		listenerCount(t) {
			return this._getListeners(t).length;
		}
		rawListeners(t) {
			return this.listeners(t);
		}
	},
	ae = qe;
ae.defaultMaxListeners = 10;
function $t(e, t) {
	const r = e.emit;
	if (r._isPiped) return;
	const s = function (o, ...i) {
		return t.emit(o, ...i), r.call(this, o, ...i);
	};
	(s._isPiped = !0), (e.emit = s);
}
function jt(e) {
	const t = [...e];
	return Object.freeze(t), t;
}
class Ut {
	constructor() {
		w(this, 'subscriptions', []);
	}
	async dispose() {
		await Promise.all(this.subscriptions.map(t => t()));
	}
}
class Ht {
	constructor(t) {
		w(this, 'handlers');
		(this.initialHandlers = t), (this.handlers = [...t]);
	}
	prepend(t) {
		this.handlers.unshift(...t);
	}
	reset(t) {
		this.handlers = t.length > 0 ? [...t] : [...this.initialHandlers];
	}
	currentHandlers() {
		return this.handlers;
	}
}
class Nt extends Ut {
	constructor(...r) {
		super();
		w(this, 'handlersController');
		w(this, 'emitter');
		w(this, 'publicEmitter');
		w(this, 'events');
		V(
			this.validateHandlers(r),
			b.formatMessage('Failed to apply given request handlers: invalid input. Did you forget to spread the request handlers Array?')
		),
			(this.handlersController = new Ht(r)),
			(this.emitter = new ae()),
			(this.publicEmitter = new ae()),
			$t(this.emitter, this.publicEmitter),
			(this.events = this.createLifeCycleEvents()),
			this.subscriptions.push(() => {
				this.emitter.removeAllListeners(), this.publicEmitter.removeAllListeners();
			});
	}
	validateHandlers(r) {
		return r.every(s => !Array.isArray(s));
	}
	use(...r) {
		V(
			this.validateHandlers(r),
			b.formatMessage(
				'Failed to call "use()" with the given request handlers: invalid input. Did you forget to spread the array of request handlers?'
			)
		),
			this.handlersController.prepend(r);
	}
	restoreHandlers() {
		this.handlersController.currentHandlers().forEach(r => {
			r.isUsed = !1;
		});
	}
	resetHandlers(...r) {
		this.handlersController.reset(r);
	}
	listHandlers() {
		return jt(this.handlersController.currentHandlers());
	}
	createLifeCycleEvents() {
		return {
			on: (...r) => this.publicEmitter.on(...r),
			removeListener: (...r) => this.publicEmitter.removeListener(...r),
			removeAllListeners: (...r) => this.publicEmitter.removeAllListeners(...r),
		};
	}
}
var Dt = {},
	Ft = /(%?)(%([sdijo]))/g;
function Bt(e, t) {
	switch (t) {
		case 's':
			return e;
		case 'd':
		case 'i':
			return Number(e);
		case 'j':
			return JSON.stringify(e);
		case 'o': {
			if (typeof e == 'string') return e;
			const r = JSON.stringify(e);
			return r === '{}' || r === '[]' || /^\[object .+?\]$/.test(r) ? e : r;
		}
	}
}
function X(e, ...t) {
	if (t.length === 0) return e;
	let r = 0,
		s = e.replace(Ft, (n, o, i, l) => {
			const a = t[r],
				c = Bt(a, l);
			return o ? n : (r++, c);
		});
	return r < t.length && (s += ` ${t.slice(r).join(' ')}`), (s = s.replace(/%{2,2}/g, '%')), s;
}
var zt = 2;
function Gt(e) {
	if (!e.stack) return;
	const t = e.stack.split(`
`);
	t.splice(1, zt),
		(e.stack = t.join(`
`));
}
var Kt = class extends Error {
		constructor(e, ...t) {
			super(e), (this.message = e), (this.name = 'Invariant Violation'), (this.message = X(e, ...t)), Gt(this);
		}
	},
	I = (e, t, ...r) => {
		if (!e) throw new Kt(t, ...r);
	};
I.as = (e, t, r, ...s) => {
	if (!t) {
		const n = s.length === 0 ? r : X(r, s);
		let o;
		try {
			o = Reflect.construct(e, [n]);
		} catch {
			o = e(n);
		}
		throw o;
	}
};
function pe() {
	if (typeof navigator < 'u' && navigator.product === 'ReactNative') return !0;
	if (typeof process < 'u') {
		const e = process.type;
		return e === 'renderer' || e === 'worker' ? !1 : !!(process.versions && process.versions.node);
	}
	return !1;
}
var ee = async e => {
	try {
		return {
			error: null,
			data: await e().catch(r => {
				throw r;
			}),
		};
	} catch (t) {
		return { error: t, data: null };
	}
};
function Vt(e) {
	return new URL(e, location.href).href;
}
function ie(e, t, r) {
	return [e.active, e.installing, e.waiting].filter(i => i != null).find(i => r(i.scriptURL, t)) || null;
}
var Xt = async (e, t = {}, r) => {
	const s = Vt(e),
		n = await navigator.serviceWorker.getRegistrations().then(l => l.filter(a => ie(a, s, r)));
	!navigator.serviceWorker.controller && n.length > 0 && location.reload();
	const [o] = n;
	if (o) return o.update().then(() => [ie(o, s, r), o]);
	const i = await ee(async () => {
		const l = await navigator.serviceWorker.register(e, t);
		return [ie(l, s, r), l];
	});
	if (i.error) {
		if (i.error.message.includes('(404)')) {
			const a = new URL((t == null ? void 0 : t.scope) || '/', location.href);
			throw new Error(
				b.formatMessage(`Failed to register a Service Worker for scope ('${a.href}') with script ('${s}'): Service Worker script does not exist at the given path.

Did you forget to run "npx msw init <PUBLIC_DIR>"?

Learn more about creating the Service Worker script: https://mswjs.io/docs/cli/init`)
			);
		}
		throw new Error(
			b.formatMessage(
				`Failed to register the Service Worker:

%s`,
				i.error.message
			)
		);
	}
	return i.data;
};
function Ie(e = {}) {
	if (e.quiet) return;
	const t = e.message || 'Mocking enabled.';
	console.groupCollapsed(`%c${b.formatMessage(t)}`, 'color:orangered;font-weight:bold;'),
		console.log('%cDocumentation: %chttps://mswjs.io/docs', 'font-weight:bold', 'font-weight:normal'),
		console.log('Found an issue? https://github.com/mswjs/msw/issues'),
		e.workerUrl && console.log('Worker script URL:', e.workerUrl),
		e.workerScope && console.log('Worker scope:', e.workerScope),
		console.groupEnd();
}
async function Jt(e, t) {
	var r, s;
	if ((e.workerChannel.send('MOCK_ACTIVATE'), await e.events.once('MOCKING_ENABLED'), e.isMockingEnabled)) {
		b.warn(
			'Found a redundant "worker.start()" call. Note that starting the worker while mocking is already enabled will have no effect. Consider removing this "worker.start()" call.'
		);
		return;
	}
	(e.isMockingEnabled = !0),
		Ie({
			quiet: t.quiet,
			workerScope: (r = e.registration) == null ? void 0 : r.scope,
			workerUrl: (s = e.worker) == null ? void 0 : s.scriptURL,
		});
}
var Yt = class {
	constructor(e) {
		this.port = e;
	}
	postMessage(e, ...t) {
		const [r, s] = t;
		this.port.postMessage({ type: e, data: r }, { transfer: s });
	}
};
function Qt(e) {
	if (!['HEAD', 'GET'].includes(e.method)) return e.body;
}
function Zt(e) {
	return new Request(e.url, { ...e, body: Qt(e) });
}
var er = (e, t) => async (r, s) => {
	const n = new Yt(r.ports[0]),
		o = s.payload.id,
		i = Zt(s.payload),
		l = i.clone(),
		a = i.clone();
	Q.cache.set(i, a), e.requests.set(o, a);
	try {
		await We(i, o, e.getRequestHandlers(), t, e.emitter, {
			onPassthroughResponse() {
				n.postMessage('NOT_FOUND');
			},
			async onMockedResponse(c, { handler: u, parsedResult: f }) {
				const d = c.clone(),
					p = c.clone(),
					g = qt(c);
				if (e.supports.readableStreamTransfer) {
					const h = c.body;
					n.postMessage('MOCK_RESPONSE', { ...g, body: h }, h ? [h] : void 0);
				} else {
					const h = c.body === null ? null : await d.arrayBuffer();
					n.postMessage('MOCK_RESPONSE', { ...g, body: h });
				}
				t.quiet ||
					e.emitter.once('response:mocked', () => {
						u.log({ request: l, response: p, parsedResult: f });
					});
			},
		});
	} catch (c) {
		c instanceof Error &&
			(b.error(
				`Uncaught exception in the request handler for "%s %s":

%s

This exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error, as it indicates a mistake in your code. If you wish to mock an error response, please see this guide: https://mswjs.io/docs/recipes/mocking-error-responses`,
				i.method,
				i.url,
				c.stack ?? c
			),
			n.postMessage('MOCK_RESPONSE', {
				status: 500,
				statusText: 'Request Handler Error',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: c.name, message: c.message, stack: c.stack }),
			}));
	}
};
async function tr(e, t) {
	e.workerChannel.send('INTEGRITY_CHECK_REQUEST');
	const { payload: r } = await e.events.once('INTEGRITY_CHECK_RESPONSE');
	if (r !== '223d191a56023cd36aa88c802961b911')
		throw new Error(`Currently active Service Worker (${r}) is behind the latest published one (223d191a56023cd36aa88c802961b911).`);
	return t;
}
var rr = new TextEncoder();
function sr(e) {
	return rr.encode(e);
}
function nr(e, t) {
	return new TextDecoder(t).decode(e);
}
function or(e) {
	return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
}
var ir = new Set([101, 103, 204, 205, 304]);
function $e(e) {
	return ir.has(e);
}
var ar = Object.defineProperty,
	cr = (e, t) => {
		for (var r in t) ar(e, r, { get: t[r], enumerable: !0 });
	},
	ce = {};
cr(ce, { blue: () => ur, gray: () => le, green: () => fr, red: () => dr, yellow: () => lr });
function lr(e) {
	return `\x1B[33m${e}\x1B[0m`;
}
function ur(e) {
	return `\x1B[34m${e}\x1B[0m`;
}
function le(e) {
	return `\x1B[90m${e}\x1B[0m`;
}
function dr(e) {
	return `\x1B[31m${e}\x1B[0m`;
}
function fr(e) {
	return `\x1B[32m${e}\x1B[0m`;
}
var te = pe(),
	je = class {
		constructor(e) {
			w(this, 'prefix');
			(this.name = e), (this.prefix = `[${this.name}]`);
			const t = ke('DEBUG'),
				r = ke('LOG_LEVEL');
			t === '1' || t === 'true' || (typeof t < 'u' && this.name.startsWith(t))
				? ((this.debug = z(r, 'debug') ? L : this.debug),
					(this.info = z(r, 'info') ? L : this.info),
					(this.success = z(r, 'success') ? L : this.success),
					(this.warning = z(r, 'warning') ? L : this.warning),
					(this.error = z(r, 'error') ? L : this.error))
				: ((this.info = L), (this.success = L), (this.warning = L), (this.error = L), (this.only = L));
		}
		extend(e) {
			return new je(`${this.name}:${e}`);
		}
		debug(e, ...t) {
			this.logEntry({ level: 'debug', message: le(e), positionals: t, prefix: this.prefix, colors: { prefix: 'gray' } });
		}
		info(e, ...t) {
			this.logEntry({ level: 'info', message: e, positionals: t, prefix: this.prefix, colors: { prefix: 'blue' } });
			const r = new hr();
			return (s, ...n) => {
				r.measure(),
					this.logEntry({
						level: 'info',
						message: `${s} ${le(`${r.deltaTime}ms`)}`,
						positionals: n,
						prefix: this.prefix,
						colors: { prefix: 'blue' },
					});
			};
		}
		success(e, ...t) {
			this.logEntry({
				level: 'info',
				message: e,
				positionals: t,
				prefix: `✔ ${this.prefix}`,
				colors: { timestamp: 'green', prefix: 'green' },
			});
		}
		warning(e, ...t) {
			this.logEntry({
				level: 'warning',
				message: e,
				positionals: t,
				prefix: `⚠ ${this.prefix}`,
				colors: { timestamp: 'yellow', prefix: 'yellow' },
			});
		}
		error(e, ...t) {
			this.logEntry({
				level: 'error',
				message: e,
				positionals: t,
				prefix: `✖ ${this.prefix}`,
				colors: { timestamp: 'red', prefix: 'red' },
			});
		}
		only(e) {
			e();
		}
		createEntry(e, t) {
			return { timestamp: new Date(), level: e, message: t };
		}
		logEntry(e) {
			const { level: t, message: r, prefix: s, colors: n, positionals: o = [] } = e,
				i = this.createEntry(t, r),
				l = (n == null ? void 0 : n.timestamp) || 'gray',
				a = (n == null ? void 0 : n.prefix) || 'gray',
				c = { timestamp: ce[l], prefix: ce[a] };
			this.getWriter(t)(
				[c.timestamp(this.formatTimestamp(i.timestamp))]
					.concat(s != null ? c.prefix(s) : [])
					.concat(Ae(r))
					.join(' '),
				...o.map(Ae)
			);
		}
		formatTimestamp(e) {
			return `${e.toLocaleTimeString('en-GB')}:${e.getMilliseconds()}`;
		}
		getWriter(e) {
			switch (e) {
				case 'debug':
				case 'success':
				case 'info':
					return pr;
				case 'warning':
					return gr;
				case 'error':
					return yr;
			}
		}
	},
	hr = class {
		constructor() {
			w(this, 'startTime');
			w(this, 'endTime');
			w(this, 'deltaTime');
			this.startTime = performance.now();
		}
		measure() {
			this.endTime = performance.now();
			const e = this.endTime - this.startTime;
			this.deltaTime = e.toFixed(2);
		}
	},
	L = () => {};
function pr(e, ...t) {
	if (te) {
		process.stdout.write(
			X(e, ...t) +
				`
`
		);
		return;
	}
	console.log(e, ...t);
}
function gr(e, ...t) {
	if (te) {
		process.stderr.write(
			X(e, ...t) +
				`
`
		);
		return;
	}
	console.warn(e, ...t);
}
function yr(e, ...t) {
	if (te) {
		process.stderr.write(
			X(e, ...t) +
				`
`
		);
		return;
	}
	console.error(e, ...t);
}
function ke(e) {
	var t;
	return te ? Dt[e] : (t = globalThis[e]) == null ? void 0 : t.toString();
}
function z(e, t) {
	return e !== void 0 && e !== t;
}
function Ae(e) {
	return typeof e > 'u'
		? 'undefined'
		: e === null
			? 'null'
			: typeof e == 'string'
				? e
				: typeof e == 'object'
					? JSON.stringify(e)
					: e.toString();
}
var mr = class extends Error {
		constructor(e, t, r) {
			super(
				`Possible EventEmitter memory leak detected. ${r} ${t.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`
			),
				(this.emitter = e),
				(this.type = t),
				(this.count = r),
				(this.name = 'MaxListenersExceededWarning');
		}
	},
	Ue = class {
		static listenerCount(e, t) {
			return e.listenerCount(t);
		}
		constructor() {
			(this.events = new Map()), (this.maxListeners = Ue.defaultMaxListeners), (this.hasWarnedAboutPotentialMemoryLeak = !1);
		}
		_emitInternalEvent(e, t, r) {
			this.emit(e, t, r);
		}
		_getListeners(e) {
			return Array.prototype.concat.apply([], this.events.get(e)) || [];
		}
		_removeListener(e, t) {
			const r = e.indexOf(t);
			return r > -1 && e.splice(r, 1), [];
		}
		_wrapOnceListener(e, t) {
			const r = (...s) => (this.removeListener(e, r), t.apply(this, s));
			return Object.defineProperty(r, 'name', { value: t.name }), r;
		}
		setMaxListeners(e) {
			return (this.maxListeners = e), this;
		}
		getMaxListeners() {
			return this.maxListeners;
		}
		eventNames() {
			return Array.from(this.events.keys());
		}
		emit(e, ...t) {
			const r = this._getListeners(e);
			return (
				r.forEach(s => {
					s.apply(this, t);
				}),
				r.length > 0
			);
		}
		addListener(e, t) {
			this._emitInternalEvent('newListener', e, t);
			const r = this._getListeners(e).concat(t);
			if (
				(this.events.set(e, r),
				this.maxListeners > 0 && this.listenerCount(e) > this.maxListeners && !this.hasWarnedAboutPotentialMemoryLeak)
			) {
				this.hasWarnedAboutPotentialMemoryLeak = !0;
				const s = new mr(this, e, this.listenerCount(e));
				console.warn(s);
			}
			return this;
		}
		on(e, t) {
			return this.addListener(e, t);
		}
		once(e, t) {
			return this.addListener(e, this._wrapOnceListener(e, t));
		}
		prependListener(e, t) {
			const r = this._getListeners(e);
			if (r.length > 0) {
				const s = [t].concat(r);
				this.events.set(e, s);
			} else this.events.set(e, r.concat(t));
			return this;
		}
		prependOnceListener(e, t) {
			return this.prependListener(e, this._wrapOnceListener(e, t));
		}
		removeListener(e, t) {
			const r = this._getListeners(e);
			return r.length > 0 && (this._removeListener(r, t), this.events.set(e, r), this._emitInternalEvent('removeListener', e, t)), this;
		}
		off(e, t) {
			return this.removeListener(e, t);
		}
		removeAllListeners(e) {
			return e ? this.events.delete(e) : this.events.clear(), this;
		}
		listeners(e) {
			return Array.from(this._getListeners(e));
		}
		listenerCount(e) {
			return this._getListeners(e).length;
		}
		rawListeners(e) {
			return this.listeners(e);
		}
	},
	He = Ue;
He.defaultMaxListeners = 10;
var D = Symbol('isPatchedModule');
function Ee(e) {
	return globalThis[e] || void 0;
}
function vr(e, t) {
	globalThis[e] = t;
}
function wr(e) {
	delete globalThis[e];
}
var ge = class {
		constructor(e) {
			(this.symbol = e),
				(this.readyState = 'INACTIVE'),
				(this.emitter = new He()),
				(this.subscriptions = []),
				(this.logger = new je(e.description)),
				this.emitter.setMaxListeners(0),
				this.logger.info('constructing the interceptor...');
		}
		checkEnvironment() {
			return !0;
		}
		apply() {
			const e = this.logger.extend('apply');
			if ((e.info('applying the interceptor...'), this.readyState === 'APPLIED')) {
				e.info('intercepted already applied!');
				return;
			}
			if (!this.checkEnvironment()) {
				e.info('the interceptor cannot be applied in this environment!');
				return;
			}
			this.readyState = 'APPLYING';
			const r = this.getInstance();
			if (r) {
				e.info('found a running instance, reusing...'),
					(this.on = (s, n) => (
						e.info('proxying the "%s" listener', s),
						r.emitter.addListener(s, n),
						this.subscriptions.push(() => {
							r.emitter.removeListener(s, n), e.info('removed proxied "%s" listener!', s);
						}),
						this
					)),
					(this.readyState = 'APPLIED');
				return;
			}
			e.info('no running instance found, setting up a new instance...'), this.setup(), this.setInstance(), (this.readyState = 'APPLIED');
		}
		setup() {}
		on(e, t) {
			const r = this.logger.extend('on');
			return this.readyState === 'DISPOSING' || this.readyState === 'DISPOSED'
				? (r.info('cannot listen to events, already disposed!'), this)
				: (r.info('adding "%s" event listener:', e, t), this.emitter.on(e, t), this);
		}
		once(e, t) {
			return this.emitter.once(e, t), this;
		}
		off(e, t) {
			return this.emitter.off(e, t), this;
		}
		removeAllListeners(e) {
			return this.emitter.removeAllListeners(e), this;
		}
		dispose() {
			const e = this.logger.extend('dispose');
			if (this.readyState === 'DISPOSED') {
				e.info('cannot dispose, already disposed!');
				return;
			}
			if ((e.info('disposing the interceptor...'), (this.readyState = 'DISPOSING'), !this.getInstance())) {
				e.info('no interceptors running, skipping dispose...');
				return;
			}
			if ((this.clearInstance(), e.info('global symbol deleted:', Ee(this.symbol)), this.subscriptions.length > 0)) {
				e.info('disposing of %d subscriptions...', this.subscriptions.length);
				for (const t of this.subscriptions) t();
				(this.subscriptions = []), e.info('disposed of all subscriptions!', this.subscriptions.length);
			}
			this.emitter.removeAllListeners(), e.info('destroyed the listener!'), (this.readyState = 'DISPOSED');
		}
		getInstance() {
			var e;
			const t = Ee(this.symbol);
			return this.logger.info('retrieved global instance:', (e = t == null ? void 0 : t.constructor) == null ? void 0 : e.name), t;
		}
		setInstance() {
			vr(this.symbol, this), this.logger.info('set global instance!', this.symbol.description);
		}
		clearInstance() {
			wr(this.symbol), this.logger.info('cleared global instance!', this.symbol.description);
		}
	},
	ue = class extends ge {
		constructor(e) {
			(ue.symbol = Symbol(e.name)), super(ue.symbol), (this.interceptors = e.interceptors);
		}
		setup() {
			const e = this.logger.extend('setup');
			e.info('applying all %d interceptors...', this.interceptors.length);
			for (const t of this.interceptors)
				e.info('applying "%s" interceptor...', t.constructor.name),
					t.apply(),
					e.info('adding interceptor dispose subscription'),
					this.subscriptions.push(() => t.dispose());
		}
		on(e, t) {
			for (const r of this.interceptors) r.on(e, t);
			return this;
		}
		once(e, t) {
			for (const r of this.interceptors) r.once(e, t);
			return this;
		}
		off(e, t) {
			for (const r of this.interceptors) r.off(e, t);
			return this;
		}
		removeAllListeners(e) {
			for (const t of this.interceptors) t.removeAllListeners(e);
			return this;
		}
	};
function br(e) {
	return (t, r) => {
		var l;
		const { payload: s } = r,
			{ requestId: n } = s,
			o = e.requests.get(n);
		if ((e.requests.delete(n), (l = s.type) != null && l.includes('opaque'))) return;
		const i = s.status === 0 ? Response.error() : new Response($e(s.status) ? null : s.body, s);
		i.url || Object.defineProperty(i, 'url', { value: o.url, enumerable: !0, writable: !1 }),
			e.emitter.emit(s.isMockedResponse ? 'response:mocked' : 'response:bypass', { response: i, request: o, requestId: s.requestId });
	};
}
function kr(e, t) {
	!(t != null && t.quiet) &&
		!location.href.startsWith(e.scope) &&
		b.warn(`Cannot intercept requests on this page because it's outside of the worker's scope ("${e.scope}"). If you wish to mock API requests on this page, you must resolve this scope issue.

- (Recommended) Register the worker at the root level ("/") of your application.
- Set the "Service-Worker-Allowed" response header to allow out-of-scope workers.`);
}
var Ar = e =>
	function (r, s) {
		return (async () => {
			e.events.removeAllListeners(), e.workerChannel.on('REQUEST', er(e, r)), e.workerChannel.on('RESPONSE', br(e));
			const i = await Xt(r.serviceWorker.url, r.serviceWorker.options, r.findWorker),
				[l, a] = i;
			if (!l) {
				const u =
					s != null && s.findWorker
						? b.formatMessage(
								`Failed to locate the Service Worker registration using a custom "findWorker" predicate.

Please ensure that the custom predicate properly locates the Service Worker registration at "%s".
More details: https://mswjs.io/docs/api/setup-worker/start#findworker
`,
								r.serviceWorker.url
							)
						: b.formatMessage(
								`Failed to locate the Service Worker registration.

This most likely means that the worker script URL "%s" cannot resolve against the actual public hostname (%s). This may happen if your application runs behind a proxy, or has a dynamic hostname.

Please consider using a custom "serviceWorker.url" option to point to the actual worker script location, or a custom "findWorker" option to resolve the Service Worker registration manually. More details: https://mswjs.io/docs/api/setup-worker/start`,
								r.serviceWorker.url,
								location.host
							);
				throw new Error(u);
			}
			(e.worker = l),
				(e.registration = a),
				e.events.addListener(window, 'beforeunload', () => {
					l.state !== 'redundant' && e.workerChannel.send('CLIENT_CLOSED'), window.clearInterval(e.keepAliveInterval);
				});
			const c = await ee(() => tr(e, l));
			return (
				c.error &&
					b.error(`Detected outdated Service Worker: ${c.error.message}

The mocking is still enabled, but it's highly recommended that you update your Service Worker by running:

$ npx msw init <PUBLIC_DIR>

This is necessary to ensure that the Service Worker is in sync with the library to guarantee its stability.
If this message still persists after updating, please report an issue: https://github.com/open-draft/msw/issues      `),
				(e.keepAliveInterval = window.setInterval(() => e.workerChannel.send('KEEPALIVE_REQUEST'), 5e3)),
				kr(a, e.startOptions),
				a
			);
		})().then(async i => {
			const l = i.installing || i.waiting;
			return (
				l &&
					(await new Promise(a => {
						l.addEventListener('statechange', () => {
							if (l.state === 'activated') return a();
						});
					})),
				await Jt(e, r).catch(a => {
					throw new Error(`Failed to enable mocking: ${a == null ? void 0 : a.message}`);
				}),
				i
			);
		});
	};
function Ne(e = {}) {
	e.quiet || console.log(`%c${b.formatMessage('Mocking disabled.')}`, 'color:orangered;font-weight:bold;');
}
var Er = e =>
		function () {
			var r;
			if (!e.isMockingEnabled) {
				b.warn(
					'Found a redundant "worker.stop()" call. Note that stopping the worker while mocking already stopped has no effect. Consider removing this "worker.stop()" call.'
				);
				return;
			}
			e.workerChannel.send('MOCK_DEACTIVATE'),
				(e.isMockingEnabled = !1),
				window.clearInterval(e.keepAliveInterval),
				Ne({ quiet: (r = e.startOptions) == null ? void 0 : r.quiet });
		},
	xr = {
		serviceWorker: { url: '/mockServiceWorker.js', options: null },
		quiet: !1,
		waitUntilReady: !0,
		onUnhandledRequest: 'warn',
		findWorker(e, t) {
			return e === t;
		},
	};
function Lr() {
	const e = (t, r) => {
		(e.state = 'pending'),
			(e.resolve = s => {
				if (e.state !== 'pending') return;
				e.result = s;
				const n = o => ((e.state = 'fulfilled'), o);
				return t(s instanceof Promise ? s : Promise.resolve(s).then(n));
			}),
			(e.reject = s => {
				if (e.state === 'pending')
					return (
						queueMicrotask(() => {
							e.state = 'rejected';
						}),
						r((e.rejectionReason = s))
					);
			});
	};
	return e;
}
var P,
	F,
	Y,
	Te,
	De =
		((Te = class extends Promise {
			constructor(t = null) {
				const r = Lr();
				super((s, n) => {
					r(s, n), t == null || t(r.resolve, r.reject);
				});
				oe(this, F);
				oe(this, P, void 0);
				w(this, 'resolve');
				w(this, 'reject');
				ye(this, P, r), (this.resolve = B(this, P).resolve), (this.reject = B(this, P).reject);
			}
			get state() {
				return B(this, P).state;
			}
			get rejectionReason() {
				return B(this, P).rejectionReason;
			}
			then(t, r) {
				return J(this, F, Y).call(this, super.then(t, r));
			}
			catch(t) {
				return J(this, F, Y).call(this, super.catch(t));
			}
			finally(t) {
				return J(this, F, Y).call(this, super.finally(t));
			}
		}),
		(P = new WeakMap()),
		(F = new WeakSet()),
		(Y = function (t) {
			return Object.defineProperties(t, {
				resolve: { configurable: !0, value: this.resolve },
				reject: { configurable: !0, value: this.reject },
			});
		}),
		Te);
function Fe() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
		const t = (Math.random() * 16) | 0;
		return (e == 'x' ? t : (t & 3) | 8).toString(16);
	});
}
var Sr = class {
	constructor(e) {
		(this.request = e), (this.responsePromise = new De());
	}
	respondWith(e) {
		I(
			this.responsePromise.state === 'pending',
			'Failed to respond to "%s %s" request: the "request" event has already been responded to.',
			this.request.method,
			this.request.url
		),
			this.responsePromise.resolve(e);
	}
};
function Be(e) {
	const t = new Sr(e);
	return Reflect.set(e, 'respondWith', t.respondWith.bind(t)), { interactiveRequest: e, requestController: t };
}
async function ze(e, t, ...r) {
	const s = e.listeners(t);
	if (s.length !== 0) for (const n of s) await n.apply(e, r);
}
function Rr(e, t) {
	try {
		return e[t], !0;
	} catch {
		return !1;
	}
}
function Pr(e) {
	try {
		return new URL(e), !0;
	} catch {
		return !1;
	}
}
var Ge = class extends ge {
		constructor() {
			super(Ge.symbol);
		}
		checkEnvironment() {
			return typeof globalThis < 'u' && typeof globalThis.fetch < 'u';
		}
		setup() {
			const e = globalThis.fetch;
			I(!e[D], 'Failed to patch the "fetch" module: already patched.'),
				(globalThis.fetch = async (t, r) => {
					var s;
					const n = Fe(),
						o = typeof t == 'string' && typeof location < 'u' && !Pr(t) ? new URL(t, location.origin) : t,
						i = new Request(o, r);
					this.logger.info('[%s] %s', i.method, i.url);
					const { interactiveRequest: l, requestController: a } = Be(i);
					this.logger.info('emitting the "request" event for %d listener(s)...', this.emitter.listenerCount('request')),
						this.emitter.once('request', ({ requestId: p }) => {
							p === n && a.responsePromise.state === 'pending' && a.responsePromise.resolve(void 0);
						}),
						this.logger.info('awaiting for the mocked response...');
					const c = l.signal,
						u = new De();
					c &&
						c.addEventListener(
							'abort',
							() => {
								u.reject(c.reason);
							},
							{ once: !0 }
						);
					const f = await ee(async () => {
						const p = ze(this.emitter, 'request', { request: l, requestId: n });
						await Promise.race([u, p, a.responsePromise]), this.logger.info('all request listeners have been resolved!');
						const g = await a.responsePromise;
						return this.logger.info('event.respondWith called with:', g), g;
					});
					if (u.state === 'rejected') return Promise.reject(u.rejectionReason);
					if (f.error) return Promise.reject(xe(f.error));
					const d = f.data;
					if (d && !((s = i.signal) != null && s.aborted)) {
						if ((this.logger.info('received mocked response:', d), Rr(d, 'type') && d.type === 'error'))
							return this.logger.info('received a network error response, rejecting the request promise...'), Promise.reject(xe(d));
						const p = d.clone();
						return (
							this.emitter.emit('response', { response: p, isMockedResponse: !0, request: l, requestId: n }),
							Object.defineProperty(d, 'url', { writable: !1, enumerable: !0, configurable: !1, value: i.url }),
							d
						);
					}
					return (
						this.logger.info('no mocked response received!'),
						e(i).then(p => {
							const g = p.clone();
							return (
								this.logger.info('original fetch performed', g),
								this.emitter.emit('response', { response: g, isMockedResponse: !1, request: l, requestId: n }),
								p
							);
						})
					);
				}),
				Object.defineProperty(globalThis.fetch, D, { enumerable: !0, configurable: !0, value: !0 }),
				this.subscriptions.push(() => {
					Object.defineProperty(globalThis.fetch, D, { value: void 0 }),
						(globalThis.fetch = e),
						this.logger.info('restored native "globalThis.fetch"!', globalThis.fetch.name);
				});
		}
	},
	Ke = Ge;
Ke.symbol = Symbol('fetch');
function xe(e) {
	return Object.assign(new TypeError('Failed to fetch'), { cause: e });
}
function Tr(e, t) {
	const r = new Uint8Array(e.byteLength + t.byteLength);
	return r.set(e, 0), r.set(t, e.byteLength), r;
}
var Ve = class {
		constructor(e, t) {
			(this.AT_TARGET = 0),
				(this.BUBBLING_PHASE = 0),
				(this.CAPTURING_PHASE = 0),
				(this.NONE = 0),
				(this.type = ''),
				(this.srcElement = null),
				(this.currentTarget = null),
				(this.eventPhase = 0),
				(this.isTrusted = !0),
				(this.composed = !1),
				(this.cancelable = !0),
				(this.defaultPrevented = !1),
				(this.bubbles = !0),
				(this.lengthComputable = !0),
				(this.loaded = 0),
				(this.total = 0),
				(this.cancelBubble = !1),
				(this.returnValue = !0),
				(this.type = e),
				(this.target = (t == null ? void 0 : t.target) || null),
				(this.currentTarget = (t == null ? void 0 : t.currentTarget) || null),
				(this.timeStamp = Date.now());
		}
		composedPath() {
			return [];
		}
		initEvent(e, t, r) {
			(this.type = e), (this.bubbles = !!t), (this.cancelable = !!r);
		}
		preventDefault() {
			this.defaultPrevented = !0;
		}
		stopPropagation() {}
		stopImmediatePropagation() {}
	},
	Or = class extends Ve {
		constructor(e, t) {
			super(e),
				(this.lengthComputable = (t == null ? void 0 : t.lengthComputable) || !1),
				(this.composed = (t == null ? void 0 : t.composed) || !1),
				(this.loaded = (t == null ? void 0 : t.loaded) || 0),
				(this.total = (t == null ? void 0 : t.total) || 0);
		}
	},
	Cr = typeof ProgressEvent < 'u';
function _r(e, t, r) {
	const s = ['error', 'progress', 'loadstart', 'loadend', 'load', 'timeout', 'abort'],
		n = Cr ? ProgressEvent : Or;
	return s.includes(t)
		? new n(t, { lengthComputable: !0, loaded: (r == null ? void 0 : r.loaded) || 0, total: (r == null ? void 0 : r.total) || 0 })
		: new Ve(t, { target: e, currentTarget: e });
}
function Xe(e, t) {
	if (!(t in e)) return null;
	if (Object.prototype.hasOwnProperty.call(e, t)) return e;
	const s = Reflect.getPrototypeOf(e);
	return s ? Xe(s, t) : null;
}
function Le(e, t) {
	return new Proxy(e, Wr(t));
}
function Wr(e) {
	const { constructorCall: t, methodCall: r, getProperty: s, setProperty: n } = e,
		o = {};
	return (
		typeof t < 'u' &&
			(o.construct = function (i, l, a) {
				const c = Reflect.construct.bind(null, i, l, a);
				return t.call(a, l, c);
			}),
		(o.set = function (i, l, a) {
			const c = () => {
				const u = Xe(i, l) || i,
					f = Reflect.getOwnPropertyDescriptor(u, l);
				return typeof (f == null ? void 0 : f.set) < 'u'
					? (f.set.apply(i, [a]), !0)
					: Reflect.defineProperty(u, l, { writable: !0, enumerable: !0, configurable: !0, value: a });
			};
			return typeof n < 'u' ? n.call(i, [l, a], c) : c();
		}),
		(o.get = function (i, l, a) {
			const c = () => i[l],
				u = typeof s < 'u' ? s.call(i, [l, a], c) : c();
			return typeof u == 'function'
				? (...f) => {
						const d = u.bind(i, ...f);
						return typeof r < 'u' ? r.call(i, [l, f], d) : d();
					}
				: u;
		}),
		o
	);
}
function Mr(e) {
	return ['application/xhtml+xml', 'application/xml', 'image/svg+xml', 'text/html', 'text/xml'].some(r => e.startsWith(r));
}
function qr(e) {
	try {
		return JSON.parse(e);
	} catch {
		return null;
	}
}
function Ir(e, t) {
	const r = $e(e.status) ? null : t;
	return new Response(r, { status: e.status, statusText: e.statusText, headers: $r(e.getAllResponseHeaders()) });
}
function $r(e) {
	const t = new Headers(),
		r = e.split(/[\r\n]+/);
	for (const s of r) {
		if (s.trim() === '') continue;
		const [n, ...o] = s.split(': '),
			i = o.join(': ');
		t.append(n, i);
	}
	return t;
}
var Se = Symbol('isMockedResponse'),
	jr = pe(),
	Ur = class {
		constructor(e, t) {
			(this.initialRequest = e),
				(this.logger = t),
				(this.method = 'GET'),
				(this.url = null),
				(this.events = new Map()),
				(this.requestId = Fe()),
				(this.requestHeaders = new Headers()),
				(this.responseBuffer = new Uint8Array()),
				(this.request = Le(e, {
					setProperty: ([r, s], n) => {
						switch (r) {
							case 'ontimeout': {
								const o = r.slice(2);
								return this.request.addEventListener(o, s), n();
							}
							default:
								return n();
						}
					},
					methodCall: ([r, s], n) => {
						var o;
						switch (r) {
							case 'open': {
								const [i, l] = s;
								return (
									typeof l > 'u' ? ((this.method = 'GET'), (this.url = Re(i))) : ((this.method = i), (this.url = Re(l))),
									(this.logger = this.logger.extend(`${this.method} ${this.url.href}`)),
									this.logger.info('open', this.method, this.url.href),
									n()
								);
							}
							case 'addEventListener': {
								const [i, l] = s;
								return this.registerEvent(i, l), this.logger.info('addEventListener', i, l), n();
							}
							case 'setRequestHeader': {
								const [i, l] = s;
								return this.requestHeaders.set(i, l), this.logger.info('setRequestHeader', i, l), n();
							}
							case 'send': {
								const [i] = s;
								i != null && (this.requestBody = typeof i == 'string' ? sr(i) : i),
									this.request.addEventListener('load', () => {
										if (typeof this.onResponse < 'u') {
											const c = Ir(this.request, this.request.response);
											this.onResponse.call(this, {
												response: c,
												isMockedResponse: Se in this.request,
												request: l,
												requestId: this.requestId,
											});
										}
									});
								const l = this.toFetchApiRequest();
								(
									((o = this.onRequest) == null ? void 0 : o.call(this, { request: l, requestId: this.requestId })) || Promise.resolve()
								).finally(() => {
									if (this.request.readyState < this.request.LOADING)
										return (
											this.logger.info(
												'request callback settled but request has not been handled (readystate %d), performing as-is...',
												this.request.readyState
											),
											jr && this.request.setRequestHeader('X-Request-Id', this.requestId),
											n()
										);
								});
								break;
							}
							default:
								return n();
						}
					},
				}));
		}
		registerEvent(e, t) {
			const s = (this.events.get(e) || []).concat(t);
			this.events.set(e, s), this.logger.info('registered event "%s"', e, t);
		}
		respondWith(e) {
			this.logger.info('responding with a mocked response: %d %s', e.status, e.statusText),
				$(this.request, Se, !0),
				$(this.request, 'status', e.status),
				$(this.request, 'statusText', e.statusText),
				$(this.request, 'responseURL', this.url.href),
				(this.request.getResponseHeader = new Proxy(this.request.getResponseHeader, {
					apply: (s, n, o) => {
						if ((this.logger.info('getResponseHeader', o[0]), this.request.readyState < this.request.HEADERS_RECEIVED))
							return this.logger.info('headers not received yet, returning null'), null;
						const i = e.headers.get(o[0]);
						return this.logger.info('resolved response header "%s" to', o[0], i), i;
					},
				})),
				(this.request.getAllResponseHeaders = new Proxy(this.request.getAllResponseHeaders, {
					apply: () => {
						if ((this.logger.info('getAllResponseHeaders'), this.request.readyState < this.request.HEADERS_RECEIVED))
							return this.logger.info('headers not received yet, returning empty string'), '';
						const n = Array.from(e.headers.entries()).map(([o, i]) => `${o}: ${i}`).join(`\r
`);
						return this.logger.info('resolved all response headers to', n), n;
					},
				})),
				Object.defineProperties(this.request, {
					response: { enumerable: !0, configurable: !1, get: () => this.response },
					responseText: { enumerable: !0, configurable: !1, get: () => this.responseText },
					responseXML: { enumerable: !0, configurable: !1, get: () => this.responseXML },
				});
			const t = e.headers.has('Content-Length') ? Number(e.headers.get('Content-Length')) : void 0;
			this.logger.info('calculated response body length', t),
				this.trigger('loadstart', { loaded: 0, total: t }),
				this.setReadyState(this.request.HEADERS_RECEIVED),
				this.setReadyState(this.request.LOADING);
			const r = () => {
				this.logger.info('finalizing the mocked response...'),
					this.setReadyState(this.request.DONE),
					this.trigger('load', { loaded: this.responseBuffer.byteLength, total: t }),
					this.trigger('loadend', { loaded: this.responseBuffer.byteLength, total: t });
			};
			if (e.body) {
				this.logger.info('mocked response has body, streaming...');
				const s = e.body.getReader(),
					n = async () => {
						const { value: o, done: i } = await s.read();
						if (i) {
							this.logger.info('response body stream done!'), r();
							return;
						}
						o &&
							(this.logger.info('read response body chunk:', o),
							(this.responseBuffer = Tr(this.responseBuffer, o)),
							this.trigger('progress', { loaded: this.responseBuffer.byteLength, total: t })),
							n();
					};
				n();
			} else r();
		}
		responseBufferToText() {
			return nr(this.responseBuffer);
		}
		get response() {
			if ((this.logger.info('getResponse (responseType: %s)', this.request.responseType), this.request.readyState !== this.request.DONE))
				return null;
			switch (this.request.responseType) {
				case 'json': {
					const e = qr(this.responseBufferToText());
					return this.logger.info('resolved response JSON', e), e;
				}
				case 'arraybuffer': {
					const e = or(this.responseBuffer);
					return this.logger.info('resolved response ArrayBuffer', e), e;
				}
				case 'blob': {
					const e = this.request.getResponseHeader('Content-Type') || 'text/plain',
						t = new Blob([this.responseBufferToText()], { type: e });
					return this.logger.info('resolved response Blob (mime type: %s)', t, e), t;
				}
				default: {
					const e = this.responseBufferToText();
					return this.logger.info('resolving "%s" response type as text', this.request.responseType, e), e;
				}
			}
		}
		get responseText() {
			if (
				(I(this.request.responseType === '' || this.request.responseType === 'text', 'InvalidStateError: The object is in invalid state.'),
				this.request.readyState !== this.request.LOADING && this.request.readyState !== this.request.DONE)
			)
				return '';
			const e = this.responseBufferToText();
			return this.logger.info('getResponseText: "%s"', e), e;
		}
		get responseXML() {
			if (
				(I(
					this.request.responseType === '' || this.request.responseType === 'document',
					'InvalidStateError: The object is in invalid state.'
				),
				this.request.readyState !== this.request.DONE)
			)
				return null;
			const e = this.request.getResponseHeader('Content-Type') || '';
			return typeof DOMParser > 'u'
				? (console.warn(
						'Cannot retrieve XMLHttpRequest response body as XML: DOMParser is not defined. You are likely using an environment that is not browser or does not polyfill browser globals correctly.'
					),
					null)
				: Mr(e)
					? new DOMParser().parseFromString(this.responseBufferToText(), e)
					: null;
		}
		errorWith(e) {
			this.logger.info('responding with an error'), this.setReadyState(this.request.DONE), this.trigger('error'), this.trigger('loadend');
		}
		setReadyState(e) {
			if ((this.logger.info('setReadyState: %d -> %d', this.request.readyState, e), this.request.readyState === e)) {
				this.logger.info('ready state identical, skipping transition...');
				return;
			}
			$(this.request, 'readyState', e),
				this.logger.info('set readyState to: %d', e),
				e !== this.request.UNSENT && (this.logger.info('triggerring "readystatechange" event...'), this.trigger('readystatechange'));
		}
		trigger(e, t) {
			const r = this.request[`on${e}`],
				s = _r(this.request, e, t);
			this.logger.info('trigger "%s"', e, t || ''),
				typeof r == 'function' && (this.logger.info('found a direct "%s" callback, calling...', e), r.call(this.request, s));
			for (const [n, o] of this.events)
				n === e &&
					(this.logger.info('found %d listener(s) for "%s" event, calling...', o.length, e), o.forEach(i => i.call(this.request, s)));
		}
		toFetchApiRequest() {
			this.logger.info('converting request to a Fetch API Request...');
			const e = new Request(this.url.href, {
					method: this.method,
					headers: this.requestHeaders,
					credentials: this.request.withCredentials ? 'include' : 'same-origin',
					body: ['GET', 'HEAD'].includes(this.method) ? null : this.requestBody,
				}),
				t = Le(e.headers, {
					methodCall: ([r, s], n) => {
						switch (r) {
							case 'append':
							case 'set': {
								const [o, i] = s;
								this.request.setRequestHeader(o, i);
								break;
							}
							case 'delete': {
								const [o] = s;
								console.warn(
									`XMLHttpRequest: Cannot remove a "${o}" header from the Fetch API representation of the "${e.method} ${e.url}" request. XMLHttpRequest headers cannot be removed.`
								);
								break;
							}
						}
						return n();
					},
				});
			return $(e, 'headers', t), this.logger.info('converted request to a Fetch API Request!', e), e;
		}
	};
function Re(e) {
	return typeof location > 'u' ? new URL(e) : new URL(e.toString(), location.href);
}
function $(e, t, r) {
	Reflect.defineProperty(e, t, { writable: !0, enumerable: !0, value: r });
}
function Hr({ emitter: e, logger: t }) {
	return new Proxy(globalThis.XMLHttpRequest, {
		construct(s, n, o) {
			t.info('constructed new XMLHttpRequest');
			const i = Reflect.construct(s, n, o),
				l = Object.getOwnPropertyDescriptors(s.prototype);
			for (const c in l) Reflect.defineProperty(i, c, l[c]);
			const a = new Ur(i, t);
			return (
				(a.onRequest = async function ({ request: c, requestId: u }) {
					const { interactiveRequest: f, requestController: d } = Be(c);
					this.logger.info('awaiting mocked response...'),
						e.once('request', ({ requestId: h }) => {
							h === u && d.responsePromise.state === 'pending' && d.respondWith(void 0);
						});
					const p = await ee(async () => {
						this.logger.info('emitting the "request" event for %s listener(s)...', e.listenerCount('request')),
							await ze(e, 'request', { request: f, requestId: u }),
							this.logger.info('all "request" listeners settled!');
						const h = await d.responsePromise;
						return this.logger.info('event.respondWith called with:', h), h;
					});
					if (p.error) {
						this.logger.info('request listener threw an exception, aborting request...', p.error), a.errorWith(p.error);
						return;
					}
					const g = p.data;
					if (typeof g < 'u') {
						if ((this.logger.info('received mocked response: %d %s', g.status, g.statusText), g.type === 'error')) {
							this.logger.info('received a network error response, rejecting the request promise...'),
								a.errorWith(new TypeError('Network error'));
							return;
						}
						return a.respondWith(g);
					}
					this.logger.info('no mocked response received, performing request as-is...');
				}),
				(a.onResponse = async function ({ response: c, isMockedResponse: u, request: f, requestId: d }) {
					this.logger.info('emitting the "response" event for %s listener(s)...', e.listenerCount('response')),
						e.emit('response', { response: c, isMockedResponse: u, request: f, requestId: d });
				}),
				a.request
			);
		},
	});
}
var Je = class extends ge {
		constructor() {
			super(Je.interceptorSymbol);
		}
		checkEnvironment() {
			return typeof globalThis.XMLHttpRequest < 'u';
		}
		setup() {
			const e = this.logger.extend('setup');
			e.info('patching "XMLHttpRequest" module...');
			const t = globalThis.XMLHttpRequest;
			I(!t[D], 'Failed to patch the "XMLHttpRequest" module: already patched.'),
				(globalThis.XMLHttpRequest = Hr({ emitter: this.emitter, logger: this.logger })),
				e.info('native "XMLHttpRequest" module patched!', globalThis.XMLHttpRequest.name),
				Object.defineProperty(globalThis.XMLHttpRequest, D, { enumerable: !0, configurable: !0, value: !0 }),
				this.subscriptions.push(() => {
					Object.defineProperty(globalThis.XMLHttpRequest, D, { value: void 0 }),
						(globalThis.XMLHttpRequest = t),
						e.info('native "XMLHttpRequest" module restored!', globalThis.XMLHttpRequest.name);
				});
		}
	},
	Ye = Je;
Ye.interceptorSymbol = Symbol('xhr');
function Nr(e, t) {
	const r = new ue({ name: 'fallback', interceptors: [new Ke(), new Ye()] });
	return (
		r.on('request', async ({ request: s, requestId: n }) => {
			const o = s.clone(),
				i = await We(s, n, e.getRequestHandlers(), t, e.emitter, {
					onMockedResponse(l, { handler: a, parsedResult: c }) {
						t.quiet ||
							e.emitter.once('response:mocked', ({ response: u }) => {
								a.log({ request: o, response: u, parsedResult: c });
							});
					},
				});
			i && s.respondWith(i);
		}),
		r.on('response', ({ response: s, isMockedResponse: n, request: o, requestId: i }) => {
			e.emitter.emit(n ? 'response:mocked' : 'response:bypass', { response: s, request: o, requestId: i });
		}),
		r.apply(),
		r
	);
}
function Dr(e) {
	return async function (r) {
		(e.fallbackInterceptor = Nr(e, r)), Ie({ message: 'Mocking enabled (fallback mode).', quiet: r.quiet });
	};
}
function Fr(e) {
	return function () {
		var r, s;
		(r = e.fallbackInterceptor) == null || r.dispose(), Ne({ quiet: (s = e.startOptions) == null ? void 0 : s.quiet });
	};
}
function Br() {
	try {
		const e = new ReadableStream({ start: r => r.close() });
		return new MessageChannel().port1.postMessage(e, [e]), !0;
	} catch {
		return !1;
	}
}
var zr = class extends Nt {
	constructor(...t) {
		super(...t);
		w(this, 'context');
		w(this, 'startHandler', null);
		w(this, 'stopHandler', null);
		w(this, 'listeners');
		I(
			!pe(),
			b.formatMessage(
				'Failed to execute `setupWorker` in a non-browser environment. Consider using `setupServer` for Node.js environment instead.'
			)
		),
			(this.listeners = []),
			(this.context = this.createWorkerContext());
	}
	createWorkerContext() {
		const t = {
			isMockingEnabled: !1,
			startOptions: null,
			worker: null,
			getRequestHandlers: () => this.handlersController.currentHandlers(),
			registration: null,
			requests: new Map(),
			emitter: this.emitter,
			workerChannel: {
				on: (r, s) => {
					this.context.events.addListener(navigator.serviceWorker, 'message', n => {
						if (n.source !== this.context.worker) return;
						const o = n.data;
						o && o.type === r && s(n, o);
					});
				},
				send: r => {
					var s;
					(s = this.context.worker) == null || s.postMessage(r);
				},
			},
			events: {
				addListener: (r, s, n) => (
					r.addEventListener(s, n),
					this.listeners.push({ eventType: s, target: r, callback: n }),
					() => {
						r.removeEventListener(s, n);
					}
				),
				removeAllListeners: () => {
					for (const { target: r, eventType: s, callback: n } of this.listeners) r.removeEventListener(s, n);
					this.listeners = [];
				},
				once: r => {
					const s = [];
					return new Promise((n, o) => {
						const i = l => {
							try {
								const a = l.data;
								a.type === r && n(a);
							} catch (a) {
								o(a);
							}
						};
						s.push(
							this.context.events.addListener(navigator.serviceWorker, 'message', i),
							this.context.events.addListener(navigator.serviceWorker, 'messageerror', o)
						);
					}).finally(() => {
						s.forEach(n => n());
					});
				},
			},
			supports: { serviceWorkerApi: !('serviceWorker' in navigator) || location.protocol === 'file:', readableStreamTransfer: Br() },
		};
		return (
			(this.startHandler = t.supports.serviceWorkerApi ? Dr(t) : Ar(t)), (this.stopHandler = t.supports.serviceWorkerApi ? Fr(t) : Er(t)), t
		);
	}
	async start(t = {}) {
		return (
			t.waitUntilReady === !0 &&
				b.warn(
					'The "waitUntilReady" option has been deprecated. Please remove it from this "worker.start()" call. Follow the recommended Browser integration (https://mswjs.io/docs/integrations/browser) to eliminate any race conditions between the Service Worker registration and any requests made by your application on initial render.'
				),
			(this.context.startOptions = Me(xr, t)),
			await this.startHandler(this.context.startOptions, t)
		);
	}
	stop() {
		super.dispose(), this.context.events.removeAllListeners(), this.context.emitter.removeAllListeners(), this.stopHandler();
	}
};
function Gr(...e) {
	return new zr(...e);
}
function Kr() {
	V(
		typeof URL < 'u',
		b.formatMessage(
			`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`
		)
	);
}
function Vr(e, t) {
	return e.toLowerCase() === t.toLowerCase();
}
function Xr(e) {
	return e < 300 ? '#69AB32' : e < 400 ? '#F0BB4B' : '#E95F5D';
}
function Jr() {
	const e = new Date();
	return [e.getHours(), e.getMinutes(), e.getSeconds()]
		.map(String)
		.map(t => t.slice(0, 2))
		.map(t => t.padStart(2, '0'))
		.join(':');
}
async function Yr(e) {
	const r = await e.clone().text();
	return { url: new URL(e.url), method: e.method, headers: Object.fromEntries(e.headers.entries()), body: r };
}
var Qr = Object.create,
	Qe = Object.defineProperty,
	Zr = Object.getOwnPropertyDescriptor,
	Ze = Object.getOwnPropertyNames,
	es = Object.getPrototypeOf,
	ts = Object.prototype.hasOwnProperty,
	et = (e, t) =>
		function () {
			return t || (0, e[Ze(e)[0]])((t = { exports: {} }).exports, t), t.exports;
		},
	rs = (e, t, r, s) => {
		if ((t && typeof t == 'object') || typeof t == 'function')
			for (let n of Ze(t)) !ts.call(e, n) && n !== r && Qe(e, n, { get: () => t[n], enumerable: !(s = Zr(t, n)) || s.enumerable });
		return e;
	},
	ss = (e, t, r) => (
		(r = e != null ? Qr(es(e)) : {}), rs(t || !e || !e.__esModule ? Qe(r, 'default', { value: e, enumerable: !0 }) : r, e)
	),
	ns = et({
		'node_modules/statuses/codes.json'(e, t) {
			t.exports = {
				100: 'Continue',
				101: 'Switching Protocols',
				102: 'Processing',
				103: 'Early Hints',
				200: 'OK',
				201: 'Created',
				202: 'Accepted',
				203: 'Non-Authoritative Information',
				204: 'No Content',
				205: 'Reset Content',
				206: 'Partial Content',
				207: 'Multi-Status',
				208: 'Already Reported',
				226: 'IM Used',
				300: 'Multiple Choices',
				301: 'Moved Permanently',
				302: 'Found',
				303: 'See Other',
				304: 'Not Modified',
				305: 'Use Proxy',
				307: 'Temporary Redirect',
				308: 'Permanent Redirect',
				400: 'Bad Request',
				401: 'Unauthorized',
				402: 'Payment Required',
				403: 'Forbidden',
				404: 'Not Found',
				405: 'Method Not Allowed',
				406: 'Not Acceptable',
				407: 'Proxy Authentication Required',
				408: 'Request Timeout',
				409: 'Conflict',
				410: 'Gone',
				411: 'Length Required',
				412: 'Precondition Failed',
				413: 'Payload Too Large',
				414: 'URI Too Long',
				415: 'Unsupported Media Type',
				416: 'Range Not Satisfiable',
				417: 'Expectation Failed',
				418: "I'm a Teapot",
				421: 'Misdirected Request',
				422: 'Unprocessable Entity',
				423: 'Locked',
				424: 'Failed Dependency',
				425: 'Too Early',
				426: 'Upgrade Required',
				428: 'Precondition Required',
				429: 'Too Many Requests',
				431: 'Request Header Fields Too Large',
				451: 'Unavailable For Legal Reasons',
				500: 'Internal Server Error',
				501: 'Not Implemented',
				502: 'Bad Gateway',
				503: 'Service Unavailable',
				504: 'Gateway Timeout',
				505: 'HTTP Version Not Supported',
				506: 'Variant Also Negotiates',
				507: 'Insufficient Storage',
				508: 'Loop Detected',
				509: 'Bandwidth Limit Exceeded',
				510: 'Not Extended',
				511: 'Network Authentication Required',
			};
		},
	}),
	os = et({
		'node_modules/statuses/index.js'(e, t) {
			var r = ns();
			(t.exports = l),
				(l.message = r),
				(l.code = s(r)),
				(l.codes = n(r)),
				(l.redirect = { 300: !0, 301: !0, 302: !0, 303: !0, 305: !0, 307: !0, 308: !0 }),
				(l.empty = { 204: !0, 205: !0, 304: !0 }),
				(l.retry = { 502: !0, 503: !0, 504: !0 });
			function s(a) {
				var c = {};
				return (
					Object.keys(a).forEach(function (f) {
						var d = a[f],
							p = Number(f);
						c[d.toLowerCase()] = p;
					}),
					c
				);
			}
			function n(a) {
				return Object.keys(a).map(function (u) {
					return Number(u);
				});
			}
			function o(a) {
				var c = a.toLowerCase();
				if (!Object.prototype.hasOwnProperty.call(l.code, c)) throw new Error('invalid status message: "' + a + '"');
				return l.code[c];
			}
			function i(a) {
				if (!Object.prototype.hasOwnProperty.call(l.message, a)) throw new Error('invalid status code: ' + a);
				return l.message[a];
			}
			function l(a) {
				if (typeof a == 'number') return i(a);
				if (typeof a != 'string') throw new TypeError('code must be a number or string');
				var c = parseInt(a, 10);
				return isNaN(c) ? o(a) : i(c);
			}
		},
	}),
	is = ss(os(), 1),
	tt = is.default;
/*! Bundled license information:

statuses/index.js:
  (*!
   * statuses
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/ const { message: as } = tt;
async function cs(e) {
	const t = e.clone(),
		r = await t.text(),
		s = t.status || 200,
		n = t.statusText || as[s] || 'OK';
	return { status: s, statusText: n, headers: Object.fromEntries(t.headers.entries()), body: r };
}
function ls(e) {
	for (var t = [], r = 0; r < e.length; ) {
		var s = e[r];
		if (s === '*' || s === '+' || s === '?') {
			t.push({ type: 'MODIFIER', index: r, value: e[r++] });
			continue;
		}
		if (s === '\\') {
			t.push({ type: 'ESCAPED_CHAR', index: r++, value: e[r++] });
			continue;
		}
		if (s === '{') {
			t.push({ type: 'OPEN', index: r, value: e[r++] });
			continue;
		}
		if (s === '}') {
			t.push({ type: 'CLOSE', index: r, value: e[r++] });
			continue;
		}
		if (s === ':') {
			for (var n = '', o = r + 1; o < e.length; ) {
				var i = e.charCodeAt(o);
				if ((i >= 48 && i <= 57) || (i >= 65 && i <= 90) || (i >= 97 && i <= 122) || i === 95) {
					n += e[o++];
					continue;
				}
				break;
			}
			if (!n) throw new TypeError('Missing parameter name at '.concat(r));
			t.push({ type: 'NAME', index: r, value: n }), (r = o);
			continue;
		}
		if (s === '(') {
			var l = 1,
				a = '',
				o = r + 1;
			if (e[o] === '?') throw new TypeError('Pattern cannot start with "?" at '.concat(o));
			for (; o < e.length; ) {
				if (e[o] === '\\') {
					a += e[o++] + e[o++];
					continue;
				}
				if (e[o] === ')') {
					if ((l--, l === 0)) {
						o++;
						break;
					}
				} else if (e[o] === '(' && (l++, e[o + 1] !== '?')) throw new TypeError('Capturing groups are not allowed at '.concat(o));
				a += e[o++];
			}
			if (l) throw new TypeError('Unbalanced pattern at '.concat(r));
			if (!a) throw new TypeError('Missing pattern at '.concat(r));
			t.push({ type: 'PATTERN', index: r, value: a }), (r = o);
			continue;
		}
		t.push({ type: 'CHAR', index: r, value: e[r++] });
	}
	return t.push({ type: 'END', index: r, value: '' }), t;
}
function us(e, t) {
	t === void 0 && (t = {});
	for (
		var r = ls(e),
			s = t.prefixes,
			n = s === void 0 ? './' : s,
			o = '[^'.concat(N(t.delimiter || '/#?'), ']+?'),
			i = [],
			l = 0,
			a = 0,
			c = '',
			u = function (E) {
				if (a < r.length && r[a].type === E) return r[a++].value;
			},
			f = function (E) {
				var O = u(E);
				if (O !== void 0) return O;
				var C = r[a],
					re = C.type,
					se = C.index;
				throw new TypeError('Unexpected '.concat(re, ' at ').concat(se, ', expected ').concat(E));
			},
			d = function () {
				for (var E = '', O; (O = u('CHAR') || u('ESCAPED_CHAR')); ) E += O;
				return E;
			};
		a < r.length;

	) {
		var p = u('CHAR'),
			g = u('NAME'),
			h = u('PATTERN');
		if (g || h) {
			var y = p || '';
			n.indexOf(y) === -1 && ((c += y), (y = '')),
				c && (i.push(c), (c = '')),
				i.push({ name: g || l++, prefix: y, suffix: '', pattern: h || o, modifier: u('MODIFIER') || '' });
			continue;
		}
		var m = p || u('ESCAPED_CHAR');
		if (m) {
			c += m;
			continue;
		}
		c && (i.push(c), (c = ''));
		var k = u('OPEN');
		if (k) {
			var y = d(),
				x = u('NAME') || '',
				v = u('PATTERN') || '',
				T = d();
			f('CLOSE'), i.push({ name: x || (v ? l++ : ''), pattern: x && !v ? o : v, prefix: y, suffix: T, modifier: u('MODIFIER') || '' });
			continue;
		}
		f('END');
	}
	return i;
}
function ds(e, t) {
	var r = [],
		s = st(e, r, t);
	return fs(s, r, t);
}
function fs(e, t, r) {
	r === void 0 && (r = {});
	var s = r.decode,
		n =
			s === void 0
				? function (o) {
						return o;
					}
				: s;
	return function (o) {
		var i = e.exec(o);
		if (!i) return !1;
		for (
			var l = i[0],
				a = i.index,
				c = Object.create(null),
				u = function (d) {
					if (i[d] === void 0) return 'continue';
					var p = t[d - 1];
					p.modifier === '*' || p.modifier === '+'
						? (c[p.name] = i[d].split(p.prefix + p.suffix).map(function (g) {
								return n(g, p);
							}))
						: (c[p.name] = n(i[d], p));
				},
				f = 1;
			f < i.length;
			f++
		)
			u(f);
		return { path: l, index: a, params: c };
	};
}
function N(e) {
	return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
function rt(e) {
	return e && e.sensitive ? '' : 'i';
}
function hs(e, t) {
	if (!t) return e;
	for (var r = /\((?:\?<(.*?)>)?(?!\?)/g, s = 0, n = r.exec(e.source); n; )
		t.push({ name: n[1] || s++, prefix: '', suffix: '', modifier: '', pattern: '' }), (n = r.exec(e.source));
	return e;
}
function ps(e, t, r) {
	var s = e.map(function (n) {
		return st(n, t, r).source;
	});
	return new RegExp('(?:'.concat(s.join('|'), ')'), rt(r));
}
function gs(e, t, r) {
	return ys(us(e, r), t, r);
}
function ys(e, t, r) {
	r === void 0 && (r = {});
	for (
		var s = r.strict,
			n = s === void 0 ? !1 : s,
			o = r.start,
			i = o === void 0 ? !0 : o,
			l = r.end,
			a = l === void 0 ? !0 : l,
			c = r.encode,
			u =
				c === void 0
					? function (se) {
							return se;
						}
					: c,
			f = r.delimiter,
			d = f === void 0 ? '/#?' : f,
			p = r.endsWith,
			g = p === void 0 ? '' : p,
			h = '['.concat(N(g), ']|$'),
			y = '['.concat(N(d), ']'),
			m = i ? '^' : '',
			k = 0,
			x = e;
		k < x.length;
		k++
	) {
		var v = x[k];
		if (typeof v == 'string') m += N(u(v));
		else {
			var T = N(u(v.prefix)),
				E = N(u(v.suffix));
			if (v.pattern)
				if ((t && t.push(v), T || E))
					if (v.modifier === '+' || v.modifier === '*') {
						var O = v.modifier === '*' ? '?' : '';
						m += '(?:'
							.concat(T, '((?:')
							.concat(v.pattern, ')(?:')
							.concat(E)
							.concat(T, '(?:')
							.concat(v.pattern, '))*)')
							.concat(E, ')')
							.concat(O);
					} else m += '(?:'.concat(T, '(').concat(v.pattern, ')').concat(E, ')').concat(v.modifier);
				else
					v.modifier === '+' || v.modifier === '*'
						? (m += '((?:'.concat(v.pattern, ')').concat(v.modifier, ')'))
						: (m += '('.concat(v.pattern, ')').concat(v.modifier));
			else m += '(?:'.concat(T).concat(E, ')').concat(v.modifier);
		}
	}
	if (a) n || (m += ''.concat(y, '?')), (m += r.endsWith ? '(?='.concat(h, ')') : '$');
	else {
		var C = e[e.length - 1],
			re = typeof C == 'string' ? y.indexOf(C[C.length - 1]) > -1 : C === void 0;
		n || (m += '(?:'.concat(y, '(?=').concat(h, '))?')), re || (m += '(?='.concat(y, '|').concat(h, ')'));
	}
	return new RegExp(m, rt(r));
}
function st(e, t, r) {
	return e instanceof RegExp ? hs(e, t) : Array.isArray(e) ? ps(e, t, r) : gs(e, t, r);
}
new TextEncoder();
function ms() {
	if (typeof navigator < 'u' && navigator.product === 'ReactNative') return !0;
	if (typeof process < 'u') {
		const e = process.type;
		return e === 'renderer' || e === 'worker' ? !1 : !!(process.versions && process.versions.node);
	}
	return !1;
}
var vs = Object.defineProperty,
	ws = (e, t) => {
		for (var r in t) vs(e, r, { get: t[r], enumerable: !0 });
	},
	bs = {};
ws(bs, { blue: () => As, gray: () => Es, green: () => Ls, red: () => xs, yellow: () => ks });
function ks(e) {
	return `\x1B[33m${e}\x1B[0m`;
}
function As(e) {
	return `\x1B[34m${e}\x1B[0m`;
}
function Es(e) {
	return `\x1B[90m${e}\x1B[0m`;
}
function xs(e) {
	return `\x1B[31m${e}\x1B[0m`;
}
function Ls(e) {
	return `\x1B[32m${e}\x1B[0m`;
}
ms();
function Ss(e, t = !0) {
	return [t && e.origin, e.pathname].filter(Boolean).join('');
}
const Rs = /[\?|#].*$/g;
function Ps(e) {
	return new URL(`/${e}`, 'http://localhost').searchParams;
}
function nt(e) {
	return e.replace(Rs, '');
}
function Ts(e) {
	return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
}
function Os(e, t) {
	if (Ts(e) || e.startsWith('*')) return e;
	const r = t || (typeof document < 'u' && document.baseURI);
	return r ? decodeURI(new URL(encodeURI(e), r).href) : e;
}
function Cs(e, t) {
	if (e instanceof RegExp) return e;
	const r = Os(e, t);
	return nt(r);
}
function _s(e) {
	return e
		.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g, (t, r, s) => {
			const n = '(.*)';
			return r ? (r.startsWith(':') ? (`${r}${s}`) : (`${r}${n}`)) : n;
		})
		.replace(/([^\/])(:)(?=\d+)/, '$1\\$2')
		.replace(/^([^\/]+)(:)(?=\/\/)/, '$1\\$2');
}
function Ws(e, t, r) {
	const s = Cs(t, r),
		n = typeof s == 'string' ? _s(s) : s,
		o = Ss(e),
		i = ds(n, { decode: decodeURIComponent })(o),
		l = (i && i.params) || {};
	return { matches: i !== !1, params: l };
}
var Ms = Object.create,
	ot = Object.defineProperty,
	qs = Object.getOwnPropertyDescriptor,
	it = Object.getOwnPropertyNames,
	Is = Object.getPrototypeOf,
	$s = Object.prototype.hasOwnProperty,
	js = (e, t) =>
		function () {
			return t || (0, e[it(e)[0]])((t = { exports: {} }).exports, t), t.exports;
		},
	Us = (e, t, r, s) => {
		if ((t && typeof t == 'object') || typeof t == 'function')
			for (let n of it(t)) !$s.call(e, n) && n !== r && ot(e, n, { get: () => t[n], enumerable: !(s = qs(t, n)) || s.enumerable });
		return e;
	},
	Hs = (e, t, r) => (
		(r = e != null ? Ms(Is(e)) : {}), Us(t || !e || !e.__esModule ? ot(r, 'default', { value: e, enumerable: !0 }) : r, e)
	),
	Ns = js({
		'node_modules/cookie/index.js'(e) {
			(e.parse = s), (e.serialize = n);
			var t = Object.prototype.toString,
				r = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
			function s(c, u) {
				if (typeof c != 'string') throw new TypeError('argument str must be a string');
				for (var f = {}, d = u || {}, p = d.decode || o, g = 0; g < c.length; ) {
					var h = c.indexOf('=', g);
					if (h === -1) break;
					var y = c.indexOf(';', g);
					if (y === -1) y = c.length;
					else if (y < h) {
						g = c.lastIndexOf(';', h - 1) + 1;
						continue;
					}
					var m = c.slice(g, h).trim();
					if (f[m] === void 0) {
						var k = c.slice(h + 1, y).trim();
						k.charCodeAt(0) === 34 && (k = k.slice(1, -1)), (f[m] = a(k, p));
					}
					g = y + 1;
				}
				return f;
			}
			function n(c, u, f) {
				var d = f || {},
					p = d.encode || i;
				if (typeof p != 'function') throw new TypeError('option encode is invalid');
				if (!r.test(c)) throw new TypeError('argument name is invalid');
				var g = p(u);
				if (g && !r.test(g)) throw new TypeError('argument val is invalid');
				var h = c + '=' + g;
				if (d.maxAge != null) {
					var y = d.maxAge - 0;
					if (isNaN(y) || !isFinite(y)) throw new TypeError('option maxAge is invalid');
					h += '; Max-Age=' + Math.floor(y);
				}
				if (d.domain) {
					if (!r.test(d.domain)) throw new TypeError('option domain is invalid');
					h += '; Domain=' + d.domain;
				}
				if (d.path) {
					if (!r.test(d.path)) throw new TypeError('option path is invalid');
					h += '; Path=' + d.path;
				}
				if (d.expires) {
					var m = d.expires;
					if (!l(m) || isNaN(m.valueOf())) throw new TypeError('option expires is invalid');
					h += '; Expires=' + m.toUTCString();
				}
				if ((d.httpOnly && (h += '; HttpOnly'), d.secure && (h += '; Secure'), d.priority)) {
					var k = typeof d.priority == 'string' ? d.priority.toLowerCase() : d.priority;
					switch (k) {
						case 'low':
							h += '; Priority=Low';
							break;
						case 'medium':
							h += '; Priority=Medium';
							break;
						case 'high':
							h += '; Priority=High';
							break;
						default:
							throw new TypeError('option priority is invalid');
					}
				}
				if (d.sameSite) {
					var x = typeof d.sameSite == 'string' ? d.sameSite.toLowerCase() : d.sameSite;
					switch (x) {
						case !0:
							h += '; SameSite=Strict';
							break;
						case 'lax':
							h += '; SameSite=Lax';
							break;
						case 'strict':
							h += '; SameSite=Strict';
							break;
						case 'none':
							h += '; SameSite=None';
							break;
						default:
							throw new TypeError('option sameSite is invalid');
					}
				}
				return h;
			}
			function o(c) {
				return c.indexOf('%') !== -1 ? decodeURIComponent(c) : c;
			}
			function i(c) {
				return encodeURIComponent(c);
			}
			function l(c) {
				return t.call(c) === '[object Date]' || c instanceof Date;
			}
			function a(c, u) {
				try {
					return u(c);
				} catch {
					return c;
				}
			}
		},
	}),
	Ds = Hs(Ns(), 1),
	de = Ds.default;
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/ function Pe() {
	return de.parse(document.cookie);
}
function Fs(e) {
	if (typeof document > 'u' || typeof location > 'u') return {};
	switch (e.credentials) {
		case 'same-origin': {
			const t = new URL(e.url);
			return location.origin === t.origin ? Pe() : {};
		}
		case 'include':
			return Pe();
		default:
			return {};
	}
}
function Bs(e) {
	var i;
	const t = e.headers.get('cookie'),
		r = t ? de.parse(t) : {};
	Z.hydrate();
	const s = Array.from((i = Z.get(e)) == null ? void 0 : i.entries()).reduce(
			(l, [a, { value: c }]) => Object.assign(l, { [a.trim()]: c }),
			{}
		),
		o = { ...Fs(e), ...s };
	for (const [l, a] of Object.entries(o)) e.headers.append('cookie', de.serialize(l, a));
	return { ...o, ...r };
}
var R = (e => (
	(e.HEAD = 'HEAD'),
	(e.GET = 'GET'),
	(e.POST = 'POST'),
	(e.PUT = 'PUT'),
	(e.PATCH = 'PATCH'),
	(e.OPTIONS = 'OPTIONS'),
	(e.DELETE = 'DELETE'),
	e
))(R || {});
class zs extends Q {
	constructor(t, r, s, n) {
		super({ info: { header: `${t} ${r}`, path: r, method: t }, resolver: s, options: n }), this.checkRedundantQueryParameters();
	}
	checkRedundantQueryParameters() {
		const { method: t, path: r } = this.info;
		if (r instanceof RegExp || nt(r) === r) return;
		Ps(r).forEach((o, i) => {}),
			b.warn(
				`Found a redundant usage of query parameters in the request handler URL for "${t} ${r}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`
			);
	}
	async parse(t) {
		var o;
		const r = new URL(t.request.url),
			s = Ws(r, this.info.path, (o = t.resolutionContext) == null ? void 0 : o.baseUrl),
			n = Bs(t.request);
		return { match: s, cookies: n };
	}
	predicate(t) {
		const r = this.matchMethod(t.request.method),
			s = t.parsedResult.match.matches;
		return r && s;
	}
	matchMethod(t) {
		return this.info.method instanceof RegExp ? this.info.method.test(t) : Vr(this.info.method, t);
	}
	extendResolverArgs(t) {
		var r;
		return { params: ((r = t.parsedResult.match) == null ? void 0 : r.params) || {}, cookies: t.parsedResult.cookies };
	}
	async log(t) {
		const r = Oe(t.request.url),
			s = await Yr(t.request),
			n = await cs(t.response),
			o = Xr(n.status);
		console.groupCollapsed(
			b.formatMessage(`${Jr()} ${t.request.method} ${r} (%c${n.status} ${n.statusText}%c)`),
			`color:${o}`,
			'color:inherit'
		),
			console.log('Request', s),
			console.log('Handler:', this),
			console.log('Response', n),
			console.groupEnd();
	}
}
function S(e) {
	return (t, r, s = {}) => new zs(e, t, r, s);
}
const G = {
		all: S(/.+/),
		head: S(R.HEAD),
		get: S(R.GET),
		post: S(R.POST),
		put: S(R.PUT),
		delete: S(R.DELETE),
		patch: S(R.PATCH),
		options: S(R.OPTIONS),
	},
	{ message: Gs } = tt;
function j(e = {}) {
	const t = (e == null ? void 0 : e.status) || 200,
		r = (e == null ? void 0 : e.statusText) || Gs[t] || '',
		s = new Headers(e == null ? void 0 : e.headers);
	return { ...e, headers: s, status: t, statusText: r };
}
function Ks(e, t) {
	var r;
	if ((t.type && Object.defineProperty(e, 'type', { value: t.type, enumerable: !0, writable: !1 }), typeof document < 'u')) {
		const s = ((r = t.headers.get('Set-Cookie')) == null ? void 0 : r.split(',')) || [];
		for (const n of s) document.cookie = n;
	}
	return e;
}
class A extends Response {
	constructor(t, r) {
		const s = j(r);
		super(t, s), Ks(this, s);
	}
	static text(t, r) {
		const s = j(r);
		return (
			s.headers.has('Content-Type') || s.headers.set('Content-Type', 'text/plain'),
			s.headers.has('Content-Length') || s.headers.set('Content-Length', t ? new Blob([t]).size.toString() : '0'),
			new A(t, s)
		);
	}
	static json(t, r) {
		const s = j(r);
		s.headers.has('Content-Type') || s.headers.set('Content-Type', 'application/json');
		const n = JSON.stringify(t);
		return s.headers.has('Content-Length') || s.headers.set('Content-Length', n ? new Blob([n]).size.toString() : '0'), new A(n, s);
	}
	static xml(t, r) {
		const s = j(r);
		return s.headers.has('Content-Type') || s.headers.set('Content-Type', 'text/xml'), new A(t, s);
	}
	static arrayBuffer(t, r) {
		const s = j(r);
		return t && s.headers.set('Content-Length', t.byteLength.toString()), new A(t, s);
	}
	static formData(t, r) {
		return new A(t, j(r));
	}
}
Kr();
const _ = [
	{
		id: '1',
		type: 'restaurant',
		typeName: 'restaurant',
		name: 'Atena',
		imgURL: '/img/atena.jpg',
		imgAlt: 'dish on a plate',
		adress: 'aleja Niepodległości 14A, Kraków',
		adressLong: 'aleja Niepodległości 14A, 31-862 Kraków',
		distance: '6.4',
		ratings: '4.8',
		prices: '$$',
		phoneNumber: '17 828 00 90',
		openHours: [
			{ openingAt: '10:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
			{ openingAt: '10:00', closingAt: '22:00', dayOfWeek: 'Monday' },
			{ openingAt: '10:00', closingAt: '22:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '10:00', closingAt: '22:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '10:00', closingAt: '22:00', dayOfWeek: 'Thursday' },
			{ openingAt: '10:00', closingAt: '23:00', dayOfWeek: 'Friday' },
			{ openingAt: '10:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '2',
		type: 'bar',
		typeName: 'bar',
		name: 'Bar Ambasada',
		imgURL: '/img/bar_ambasada.jpg',
		imgAlt: 'a set of drinks of different colors',
		adress: 'Zagraniczna 69, Kraków',
		adressLong: 'Zagraniczna 69, 30-002 Kraków',
		distance: '3.5',
		ratings: '4.5',
		prices: '$$',
		phoneNumber: '17 586 12 34',
		openHours: [
			{ openingAt: '13:00', closingAt: '00:00', dayOfWeek: 'Sunday' },
			{ openingAt: '13:00', closingAt: '00:00', dayOfWeek: 'Monday' },
			{ openingAt: '13:00', closingAt: '00:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '13:00', closingAt: '00:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '13:00', closingAt: '00:00', dayOfWeek: 'Thursday' },
			{ openingAt: '14:00', closingAt: '01:00', dayOfWeek: 'Friday' },
			{ openingAt: '14:00', closingAt: '01:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '3',
		type: 'pizzeria',
		typeName: 'pizzeria',
		name: 'Da Grasso',
		imgURL: '/img/da_grasso.jpg',
		imgAlt: 'pizza',
		adress: 'Aleja Ducha Świętego 34, Kraków',
		adressLong: 'Aleja Ducha Świętego 34, 31-964 Kraków',
		distance: '2.2',
		ratings: '4.4',
		prices: '$',
		phoneNumber: '17 994 99 40',
		openHours: [
			{ openingAt: '14:00', closingAt: '01:00', dayOfWeek: 'Sunday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Monday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Thursday' },
			{ openingAt: '14:00', closingAt: '01:00', dayOfWeek: 'Friday' },
			{ openingAt: '14:00', closingAt: '01:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '4',
		type: 'fast food',
		typeName: 'fast-food',
		name: 'Durum Kebab',
		imgURL: '/img/durum_kebab.jpg',
		imgAlt: 'kebab',
		adress: 'Wyspańskiego 1, Kraków',
		adressLong: 'Wyspańskiego 1, 32-050 Kraków',
		distance: '2.3',
		ratings: '4.4',
		prices: '$',
		phoneNumber: '17 729 66 99',
		openHours: [
			{ openingAt: '11:00', closingAt: '00:00', dayOfWeek: 'Sunday' },
			{ openingAt: '10:00', closingAt: '01:00', dayOfWeek: 'Monday' },
			{ openingAt: '10:00', closingAt: '01:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '10:00', closingAt: '01:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '10:00', closingAt: '01:00', dayOfWeek: 'Thursday' },
			{ openingAt: '10:00', closingAt: '02:00', dayOfWeek: 'Friday' },
			{ openingAt: '10:00', closingAt: '02:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '5',
		type: 'restaurant',
		typeName: 'restaurant',
		name: 'Fratelli',
		imgURL: '/img/fratelli.jpg',
		imgAlt: 'dish on a plate',
		adress: 'Witosa 73, Kraków',
		adressLong: 'Witosa 73, 30-612 Kraków',
		distance: '1.8',
		ratings: '4.9',
		prices: '$$$',
		phoneNumber: '17 583 74 74',
		openHours: [
			{ openingAt: '11:00', closingAt: '22:00', dayOfWeek: 'Sunday' },
			{ openingAt: '11:00', closingAt: '22:00', dayOfWeek: 'Monday' },
			{ openingAt: '11:00', closingAt: '22:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '11:00', closingAt: '22:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '11:00', closingAt: '22:00', dayOfWeek: 'Thursday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Friday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '6',
		type: 'oriental cuisine',
		typeName: 'oriental-cuisine',
		name: 'Ikeda Sushi',
		imgURL: '/img/ikeda_sushi.jpg',
		imgAlt: 'different types of sushi on a big plate',
		adress: 'Mickiewicza 44, Kraków',
		adressLong: 'Mickiewicza 44, 32-050 Kraków',
		distance: '4.0',
		ratings: '4.6',
		prices: '$$',
		phoneNumber: '17 315 15 16',
		openHours: [
			{ openingAt: '12:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
			{ openingAt: '14:00', closingAt: '22:00', dayOfWeek: 'Monday' },
			{ openingAt: '14:00', closingAt: '22:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '14:00', closingAt: '22:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '14:00', closingAt: '22:00', dayOfWeek: 'Thursday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Friday' },
			{ openingAt: '12:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '7',
		type: 'fast food',
		typeName: 'fast-food',
		name: 'KFC',
		imgURL: '/img/kfc.jpeg',
		imgAlt: 'chicken nuggets in a KFC cup',
		adress: 'Powstańców Warszawy 3, Kraków',
		adressLong: 'Powstańców Warszawy 3, 31-442 Kraków',
		distance: '3.5',
		ratings: '3.7',
		prices: '$$',
		phoneNumber: '17 267 23 93',
		openHours: [
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Sunday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Monday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Thursday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Friday' },
			{ openingAt: '09:00', closingAt: '00:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '8',
		type: 'oriental cuisine',
		typeName: 'oriental-cuisine',
		name: 'KIM PHO',
		imgURL: '/img/kim_pho.jpg',
		imgAlt: 'oriental dish',
		adress: 'Sienkiewicza 98, Kraków',
		adressLong: 'Sienkiewicza 98, 30-033 Kraków',
		distance: '8.1',
		ratings: '5',
		prices: '$$$',
		phoneNumber: '17 729 46 11',
		openHours: [
			{ openingAt: '12:00', closingAt: '20:00', dayOfWeek: 'Sunday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Monday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Thursday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Friday' },
			{ openingAt: '11:00', closingAt: '21:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '9',
		type: 'restaurant',
		typeName: 'restaurant',
		name: 'Manuka',
		imgURL: '/img/manuka.jpg',
		imgAlt: 'pizza',
		adress: 'Rzeczna 8, Kraków',
		adressLong: 'Rzeczna 8, 30-021 Kraków',
		distance: '1.6',
		ratings: '4.8',
		prices: '$$$',
		phoneNumber: '17 938 17 37',
		openHours: [
			{ openingAt: '08:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
			{ openingAt: '08:00', closingAt: '22:00', dayOfWeek: 'Monday' },
			{ openingAt: '08:00', closingAt: '22:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '08:00', closingAt: '22:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '08:00', closingAt: '22:00', dayOfWeek: 'Thursday' },
			{ openingAt: '08:00', closingAt: '22:00', dayOfWeek: 'Friday' },
			{ openingAt: '08:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '10',
		type: 'fast food',
		typeName: 'fast-food',
		name: "McDonald's",
		imgURL: '/img/mcdonalds.jpg',
		imgAlt: "fries, hamburger and a cup with McDonald's logo",
		adress: 'Powstańców Warszawy 43, Kraków',
		adressLong: 'Powstańców Warszawy 43, 31-442 Kraków',
		distance: '1.1',
		ratings: '3.8',
		prices: '$',
		phoneNumber: '17 933 45 54',
		openHours: [
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Sunday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Monday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Thursday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Friday' },
			{ openingAt: '03:00', closingAt: '00:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '11',
		type: 'pizzeria',
		typeName: 'pizzeria',
		name: 'O Sole Mio',
		imgURL: '/img/o_sole_mio.jpg',
		imgAlt: 'pizza',
		adress: 'Wolności 100, Kraków',
		adressLong: 'Wolności 100, 30-661 Kraków',
		distance: '4.3',
		ratings: '4.9',
		prices: '$$',
		phoneNumber: '17 583 20 30',
		openHours: [
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Monday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Thursday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Friday' },
			{ openingAt: '11:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '12',
		type: 'pizzeria',
		typeName: 'pizzeria',
		name: 'Vino Rosso',
		imgURL: '/img/vino_rosso.jpg',
		imgAlt: 'pizza',
		adress: 'Kilińskiego 17, Kraków',
		adressLong: 'Kilińskiego 17, 30-308 Kraków',
		distance: '5.7',
		ratings: '4.9',
		prices: '$$',
		phoneNumber: '17 583 29 31',
		openHours: [
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Sunday' },
			{ openingAt: '16:00', closingAt: '22:00', dayOfWeek: 'Monday' },
			{ openingAt: '16:00', closingAt: '22:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '16:00', closingAt: '22:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '16:00', closingAt: '22:00', dayOfWeek: 'Thursday' },
			{ openingAt: '16:00', closingAt: '22:00', dayOfWeek: 'Friday' },
			{ openingAt: '14:00', closingAt: '23:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
	{
		id: '13',
		type: 'bar',
		typeName: 'bar',
		name: 'Viva',
		imgURL: '/img/viva.jpg',
		imgAlt: 'beers standing on the bar counter',
		adress: 'Legionów 8, Kraków',
		adressLong: 'Legionów 8, 30-824 Kraków',
		distance: '0.9',
		ratings: '3.9',
		prices: '$',
		phoneNumber: '17 220 01 02',
		openHours: [
			{ openingAt: '16:00', closingAt: '01:00', dayOfWeek: 'Sunday' },
			{ openingAt: '16:00', closingAt: '01:00', dayOfWeek: 'Monday' },
			{ openingAt: '16:00', closingAt: '01:00', dayOfWeek: 'Tuesday' },
			{ openingAt: '16:00', closingAt: '01:00', dayOfWeek: 'Wednesday' },
			{ openingAt: '16:00', closingAt: '01:00', dayOfWeek: 'Thursday' },
			{ openingAt: '17:00', closingAt: '02:00', dayOfWeek: 'Friday' },
			{ openingAt: '17:00', closingAt: '02:00', dayOfWeek: 'Saturday' },
		],
		isVisited: !1,
		isFavourite: !1,
	},
];
let M = JSON.parse(localStorage.getItem('visited')) || [],
	q = JSON.parse(localStorage.getItem('favourites')) || [];
const W = (e, t = 'any') => {
		console.log('catering establishments: ' + e);
		const r = e.map(n => ({ ...n, isVisited: M.includes(n.id), isFavourite: q.includes(n.id) }));
		return console.log('matching places: ' + r), (t && t === 'any') || t == 'undefined' ? r : r.filter(n => n.typeName === t);
	},
	U = (e, t) => (t ? e.filter(r => r.name.toLowerCase().includes(t.toLowerCase())) : e),
	Vs = [
		G.get('/:category/:type', ({ params: e }) => A.json({ matchingCateringEstablishments: W(_, 'any') })),
		G.post('/:category/:type', async ({ request: e, params: t }) => {
			const { searchPhrase: r } = await e.json();
			switch (t.category) {
				case 'all':
					return A.json({ matchingCateringEstablishments: U(W(_, t.type), r) });
				case 'unvisited':
					const s = _.filter(c => !M.includes(c.id));
					return A.json({ matchingCateringEstablishments: U(W(s, t.type), r) });
				case 'favourites':
					const n = _.filter(c => q.includes(c.id));
					return A.json({ matchingCateringEstablishments: U(W(n, t.type), r) });
				case 'highly-rated':
					const o = _.filter(c => Number(c.ratings) >= 4.8);
					return A.json({ matchingCateringEstablishments: U(W(o, t.type), r) });
				case 'currently-open':
					const i = new Date().getDay(),
						l = new Date().toLocaleTimeString('pl-PL').slice(0, -3),
						a = _.filter(c =>
							c.openHours[i].closingAt > c.openHours[i].openingAt
								? l >= c.openHours[i].openingAt && l < c.openHours[i].closingAt
								: c.openHours[i].closingAt < c.openHours[i].openingAt
									? l >= c.openHours[i].openingAt || l < c.openHours[i].closingAt
									: c.openHours[i].closingAt === c.openHours[i].openingAt
						);
					return A.json({ matchingCateringEstablishments: U(W(a, t.type), r) });
				default:
					return A.json({ matchingCateringEstablishments: U(W(_), r) });
			}
		}),
		G.post('/visited', async ({ request: e }) => {
			const { clickedId: t } = await e.json();
			return (
				M.includes(t) ? (M = M.filter(r => r !== t)) : M.push(t),
				localStorage.setItem('visited', JSON.stringify(M)),
				new A(null, { status: 200 })
			);
		}),
		G.post('/favourites', async ({ request: e }) => {
			const { clickedId: t } = await e.json();
			return (
				q.includes(t) ? (q = q.filter(r => r !== t)) : q.push(t),
				localStorage.setItem('favourites', JSON.stringify(q)),
				new A(null, { status: 200 })
			);
		}),
		G.get('/sort-options', () => A.json({ sortOptions: lt })),
	],
	en = Gr(...Vs);
export { en as worker };
