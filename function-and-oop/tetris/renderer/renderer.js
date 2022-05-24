import { Data } from '../data.js';
import { ERR, IS_OVERRIDE, prop, TMPL } from '../utils/index.js';

export const Renderer = class {
  constructor(row, col) {
    prop(this, { row, col });
  }
  clear() {
    IS_OVERRIDE();
  }
  render(data) {
    if (!(data instanceof Data)) ERR('invalide data');
    TMPL(this, 'render', data);
  }
};
