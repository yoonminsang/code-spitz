import { createElement, HOOK, OVERRIDE, setBackgroundColor } from '../utils/index.js';
import { Renderer } from './renderer.js';

export const TableRenderer = class extends Renderer {
  constructor(row, col, backgroundColor) {
    super(row, col);
    this.backgroundColor = backgroundColor;
    this.base = createElement('table');
    this.blocks = [];
    while (row--) {
      const tr = this.base.appendChild(createElement('tr'));
      const curr = [];
      this.blocks.push(curr);
      let i = col;
      while (i--) curr.push(tr.appendChild(createElement('td')).style);
    }
    this.clear();
  }
  [OVERRIDE(Renderer, 'clear')]() {
    this.blocks.forEach((block) => block.forEach((s) => setBackgroundColor(s, this.backgroundColor)));
  }
  [HOOK(Renderer, 'render')](data) {
    this.blocks.forEach((blockCol, row) =>
      blockCol.forEach((s, col) => {
        if (data[row]?.[col] && data[row][col] !== '0') {
          setBackgroundColor(s, data[row][col]);
        } else {
          setBackgroundColor(s, this.backgroundColor);
        }
      }),
    );
  }
};

// const t = new TableRenderer(5, 5, 'red');
// t.base.style.cssText = `
// width:500px;height:500px;border:0px;
// border-spacing:0;border-collapse:collapse
// `;
// document.body.appendChild(t.base);
// t.render(
// new Data(5, 5).all(
//   ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
//   ['#f00', '#f00', '#00f', '#ff0', '#0f0'],
//   ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
//   ['#f00', '#f00', '#00f', '#ff0', '#0f0'],
//   ['#0f0', '#f00', '#00f', '#ff0', '#0ff'],
// ),
// );
