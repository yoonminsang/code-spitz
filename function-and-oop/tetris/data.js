import { prop } from './utils/index.js';

export const Data = class extends Array {
  constructor(row, col) {
    super();
    prop(this, { row, col });
  }
  makeCell(row, col, color, test) {
    if (row > this.row || col > this.col || row < 0 || col < 0 || color === '0') return this;
    const thisRow = this[row] || (this[row] = []);
    if (color && thisRow[col]) test.isIntersacted = true;
    thisRow[col] = color;
    return this;
  }
  makeRow(row, ...color) {
    return color.forEach((v, i) => this.makeCell(row, i, v)), this;
  }
  all(...rows) {
    return rows.forEach((v, i) => this.makeRow(i, ...v)), this;
  }
};
