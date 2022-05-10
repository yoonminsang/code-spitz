import { Data } from '../Data';
import { prop } from '../util';

export const Renderer = class {
  constructor(col, row) {
    prop(this, { col, row, blocks: [] });
    while (row--) this.blocks.push([]);
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