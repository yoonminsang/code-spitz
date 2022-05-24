export const prop = (target, value) => Object.assign(target, value);
export const createElement = (element) => document.createElement(element);
export const setBackgroundColor = (style, value) => (style.backgroundColor = value);
export const sel = (str) => document.querySelector(str);
export const ERR = (v) => {
  throw v;
};
export const IS_OVERRIDE = () => ERR('override');
export const OVERRIDE = (parent, method) => (typeof parent.prototype[method] === 'function' ? method : ERR());
export const TMPL = (self, method, ...arg) => ('_' + method in self ? self['_' + method](arg) : ERR());
export const HOOK = (parent, method) => (typeof parent.prototype[method] === 'function' ? '_' + method : ERR());
