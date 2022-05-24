import { Data } from '../data.js';
import { prop } from '../utils/index.js';

export const Renderer = class {
  constructor(row, col) {
    prop(this, { row, col });
  }
  clear() {
    throw 'override';
  }
  render(data) {
    if (!(data instanceof Data)) throw 'invalide data';
    this._render(data);
  }
  _render(data) {
    throw 'override!';
  }
};
