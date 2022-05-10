import { prop } from './util';

export const Data = class extends Array {
  constructor(row, col) {
    super();
    prop(this, { row, col });
  }
};
