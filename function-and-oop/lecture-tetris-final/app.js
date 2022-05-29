import { sel } from '../tetris/utils';

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
  // 클래스의 코드로 메소드를 안쓸까?? 이게 중요함.
  // 결국 전략객체
  const Panel = class {
    constructor(game, _init, _render) {
      PROP(this, game, _init, _render);
    }
    init(...arg) {
      return (this.base = this._init(this.game, ...arg));
    }
    render(...arg) {
      this._render(this.base, this.game, ...arg);
    }
  };
  const Game = class {
    constructor(basePanel, row, col) {}
    addState(state, { init, render }, f) {
      this.state[state] = f;
      this.panel[panel] = new Panel(this, init, render);
    }
  };
  return {
    init() {
      const game = new Game(10, 20, {
        init() {
          return sel('#stage');
        },
        render(base, game, panel, { base: el = panel.init() }) {
          base.innerHTML = '';
          const { base: el = panel.init() } = panel;
          base.appendChild(el);
        },
      });
      // 전략패턴, 상태패턴
      game.addState(
        Gametitle,
        {
          init(game, ...arg) {
            sel('#title').style.display = 'block';
            sel('#title.start').onclick = () => game.setState(Game.stageIntro);
            return sel('#title');
          },
          render: null,
        },
        (_, { stage, score }) => {
          stage.clear();
          score.clear();
        },
      );
    },
  };
})(SET);

APP.init();

// 1. 11. 11
