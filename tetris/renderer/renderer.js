import { Data } from '../Data';
import { prop } from '../utils';

export const Renderer = class {
  constructor(col, row) {
    prop(this, { col, row });
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
