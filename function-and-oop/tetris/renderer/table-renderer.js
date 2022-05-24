import { createElement, setBackgroundColor } from '../utils/index.js';
import { Renderer } from './renderer.js';

export const TableRenderer = class extends Renderer {
  constructor(row, col, backgroundColor) {
    super(row, col);
    this.backgroundColor = backgroundColor;
    this.base = createElement('table');
    while (row--) {
      const tr = base.appendChild(createElement('tr'));
      const curr = [];
      this.blocks.push(curr);
      let i = col;
      while (i--) curr.push(tr.appendChild(createElement('td')).style);
    }
    this.clear();
  }
  clear() {
    this.blocks.forEach((block) => block.forEach((s) => setBackgroundColor(s, this.backgroundColor)));
  }
  _render(v) {
    this.blocks.forEach((block, row) => block.forEach((s, col) => setBackgroundColor(s, v[row][col])));
  }
};

// const t = new TableRenderer(5, 5, 'red');
// t.base.style.cssText = `
// width:500px;height:500px;border:0px;
// border-spacing:0;border-collapse:collapse
// `;
// document.body.appendChild(t.base);
// t.render(
//   new Data(5, 5).all(
//     ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
//     ['#f00', '#f00', '#00f', '#ff0', '#0f0'],
//     ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
//     ['#f00', '#f00', '#00f', '#ff0', '#0f0'],
//     ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
//   ),
// );
