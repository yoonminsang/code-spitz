import { createElement, setBackgroundColor } from '../util';
import { Renderer } from './renderer';

const TableRenderer = class extends Renderer {
  constructor(base, back, col, row) {
    super(col, row);
    this.back = back;
    while (row--) {
      const tr = base.appendChild(createElement('tr')),
        curr = [];
      this.blocks.push(curr);
      let i = col;
      while (i--) curr.push(tr.appendChild(createElement('td')).style);
    }
    this.clear();
  }
  clear() {
    this.blocks.forEach((curr) => curr.foReach((s) => setBackgroundColor(s, this.back)));
  }
  _render(v) {
    this.blocks.forEach((curr, row) => curr.forEach((s, col) => setBackgroundColor(s, v[row][col])));
  }
};
