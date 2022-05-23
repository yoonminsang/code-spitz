const APP = ((SET) => {
  'use strict';

  // 문은 컴파일러한테 주는 힌트다
  // 세미콜론 찍어라. minify하면 깨진다. 이거면 끝이야
  const repeat = (count, ...arg) => {
    const f = arg.pop();
    for (let i = 0; i < count; i++) f(i, ...arg);
  };
  const PROP = (self, ...v) => Object.assign(self, ...v);
  const ERR = (v) => {
    throw v;
  };
  const IS_OVERRIDE = () => ERR('override');
  const OVERRIDE = (parent, method) => (typeof parent.prototype[method] === 'function' ? method : ERR());
  const TMPL = (self, method, ...arg) => ('_' + method in self ? self['_' + method](arg) : ERR());
  const HOOK = (parent, method) => (typeof parent.prototype[method] === 'function' ? '_' + method : ERR());
  // 템플릿 메소드 패턴. 명시적으로 바꾸자
  const Subdata = class {
    constructor(listener) {
      PROP(this, { listener });
    }
    notify() {
      this.listener?.();
    }
    clear() {
      TMPL(this, 'clear')();
    }
  };
  const Stage = class extends SubData {
    [HOOK(Subdata, 'clear')]() {
      this.stage = 0;
      this.isNext();
    }
    isNext() {
      if (this.stage++ === SET.stage.max) return false;
      else {
        this.notify();
        return true;
      }
    }
    get speed() {
      const {
        stage: {
          speed: [min, max],
          max: stageMax,
        },
      } = SET;
      return min - ((min - max) * (this.stage - 1)) / stageMax;
    }
    get count() {
      // 구조분해할당하면 선언적으로 바뀌어. 필수.
      const {
        stage: {
          count: [max, inc],
        },
      } = SET;
      return max + inc * (this.stage - 1);
    }
  };
  const Score = class extends SubData {
    [HOOK(Subdata, 'clear')]() {
      this.curr = this.total = 0;
      this.notify();
    }
    add(line, stagee) {
      // 생략
    }
  };
  const Block = class {
    static get() {}
    constructor() {}
    left() {}
    right() {}
    get block() {}
  };
  const Data = class extends Array {
    constructor(row, col) {
      super(row);
      this.fill([]);
      PROP(this, { col });
    }
    cell() {}
    row() {}
    all() {}
  };
  const Renderer = class {
    constructor() {}
    clear() {
      IS_OVERRIDE();
    }
    render(v) {
      TMPL(this, 'render', v);
    }
  };
  const TableRenderer = class extends Renderer {
    [HOOK(Renderer, 'render')]() {}
    [OVERRIDE(Renderer, 'clear')]() {}
  };
  const Game = class {
    // TODO
    // 56.18
    // https://www.youtube.com/watch?v=ik7HZrEqfEA&list=PLBA53uNlbf-vuKTARH6Ka7a_Jp0OVT_AY&index=2&ab_channel=HikaMaeng
  };
})(SET);

APP.init();
