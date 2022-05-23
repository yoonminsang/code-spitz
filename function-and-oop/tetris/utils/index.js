export const prop = (target, value) => Object.assign(target, value);
export const createElement = (element) => document.createElement(element);
export const setBackgroundColor = (style, value) => (style.backgroundColor = value);
export const sel = (str) => document.querySelector(str);
