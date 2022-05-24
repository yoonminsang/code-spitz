import { prop, TMPL } from './utils/index.js';

// 클래스명 수정
export const TemplateMethodPattern = class {
  constructor(listener) {
    prop(this, { listener });
  }
  notify() {
    this.listener?.();
  }
  clear() {
    TMPL(this, 'clear');
  }
};
