import { createElement, setBackgroundColor } from '../utils';
import { Renderer } from './renderer';

export const TableRenderer = class extends Renderer {
  constructor(base, backgroundColor, col, row) {
    super(col, row);
    this.backgroundColor = backgroundColor;
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

// const TableRenderer2 = (_) => {
//   const el = (v) => document.createElement(v);
//   const add = (p, c) => p.appendChild(typeof c === 'string' ? el(c) : c);
//   const back = (s, v) => (s.backgroundColor = v);
//   return class extends Renderer {
//     constructor(col, row, back) {
//       super(col, row, el('table'), back);
//       const { base, blocks } = this;
//       let { row: i } = this;
//       while (i--) {
//         const curr = [],
//           tr = add(base, 'tr');
//         let j = col;
//         blocks.push(curr);
//         while (j--) curr.push(add(tr, 'td').style);
//       }
//     }
//     clear() {
//       this.blocks.forEach((block) => block.forEach((s) => back(s, this.back)));
//     }
//     _render(v) {
//       this.blocks.forEach((block, row) => block.forEach((s, col) => back(s, v[row][col])));
//     }
//   };
// };
