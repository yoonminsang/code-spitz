import { prop } from './utils/index.js';

export const Data = class extends Array {
  constructor(row, col) {
    super();
    prop(this, { row, col });
  }
  makeCell(row, col, color, test) {
    if (!color || color === '0') {
      return this;
    }
    const thisRow = this[row] || (this[row] = []);
    if (test) {
      if (thisRow[col] || row < 0 || col < 0 || row >= this.row || col >= this.col) {
        test.isIntersacted = true;
      }
    } else {
      thisRow[col] = color;
    }
    return this;
  }
  makeRow(row, ...col) {
    return col.forEach((color, i) => this.makeCell(row, i, color)), this;
  }
  all(...rows) {
    return rows.forEach((col, i) => this.makeRow(i, ...col)), this;
  }
};
