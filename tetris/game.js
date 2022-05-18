import { Panel } from './panel';
import { Score } from './score';
import { Stage } from './stage';
import { prop, sel } from './utils';

const TState = {};
'title,stageIntro,play,dead,stageClear,clear,ranking'.split(',').forEach((v) => (TState[v] = Symbol()));
const Game = class {
  constructor(base, row, col, ...v) {
    const stage = new Stage(10, 1, 10);
    prop(this, { base, row, col, state: {}, curr: 'title', score: new Score(stage), stage });
    let i = 0;
    while (i < v.length) this.state[v[i++]] = Panel.get(this, v[i++], v[i++]);
  }
  setState(state) {
    if (!Object.values(TState).includes(state)) throw 'invalid';
    this.curr = state;
    this.base.innerHTML = '';
    // this.curr(state)는 패널 키, 패널안에는 베이스객체가 있다.
    const {
      state: {
        [this.curr]: { base: pannelBase },
      },
    } = this;
    // 아래 세줄은 base객체에 clear 메서드 넣어서 초기화시켜야함.
    // 지금은 이해를 돕기위해 도메인, 네이티브 분리를 안함.
    this.base.innerHTML = '';
    this.base.appendChild(pannelBase);
    pannelBase.style.display = 'block';
    // 현재 심볼에 해당하는 메서드 실행
    this[this.curr]();
  }
  _render(v) {
    const {
      state: { [this.curr]: base },
    } = this;
    base.render(v);
  }
  [s.title]() {
    this.stage.clear();
    this.score.clear();
  }
  [s.stageIntro]() {
    this._render(this.stage);
  }
  [s.play]() {
    const data = new DataTransfer(this.row, this.col);
    // TODO ....
    this._render(data); // update
    this._render(Block.block()); // next
  }
  [s.stageClear]() {}
  [s.dead]() {}
  [s.clear]() {}
  [s.ranking]() {}
};
Object.entries(TState).forEach(([str, symbol]) => (Game[str] = symbol));
Object.freeze(Game);

const game = new Game(
  sel('body'),
  20,
  10,
  Game.title,
  (game) => {
    sel('#title .btn').onclick = () => game.setState(Game.stageIntro);
  },
  null,
  Game.stageIntro,
  (game) => sel('#stageIntro'),
  (game, v) => {
    sel('#stageIntro .stage').innerHTML = v;
    setTimeout((_) => game.setState(Game.play), 500);
  },
  Game.play,
  (game) => {
    const t = new TableRenderer(game.col, game.row, '#000');
    sel('#play').appendChild(t.base);
    sel('#play').renderer = t;
    return sel('#play');
  },
  (v) => {
    switch (true) {
      case v instanceof Data:
        sel('#play').renderer.render(v);
        break;
      case v instanceof Block:
        v = v.block;
        const t = new TableRenderer(
          v.reduce((p, v) => (v.length > p ? v.length : p), 0),
          v.length,
          'rgba(0,0,0,0)',
        );
        t.base.style.cssText = 'width:100px;height:100px;border:0px;border-spacing:0;border-collapse:collapse';
        sel('#play .next').innerHTML = '';
        sel('#play .next').appendChild(t.base);
        t.render(new Data(5, 5).all(...v.map((v) => (v == '0' ? '0' : v.color))));
        break;
    }
  },
);
