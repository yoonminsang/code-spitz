import { Panel } from './panel.js';
import { Score } from './score.js';
import { Stage } from './stage.js';
import { Data } from './data.js';
import { ERR, prop, sel } from './utils/index.js';
import { TableRenderer } from './renderer/table-renderer.js';

const TState = {};
'title,stageIntro,play,stageClear,clear,dead,ranking'.split(',').forEach((v) => (TState[v] = Symbol()));
const Game = class {
  constructor(base, row, col, ...v) {
    const stage = new Stage(10, 1, 10);
    prop(this, { base, row, col, state: {}, curr: '', score: new Score(stage), stage });
    v.forEach(({ game, selectBase, render }) => {
      this.state[game] = Panel.get(this, selectBase, render);
    });
  }
  // ex) state : Game.stageIntro
  setState(state) {
    if (!Object.values(TState).includes(state)) ERR('invalid');
    this.curr = state;
    // constructor의 while문에서 Panel.get을 했기 때문에 Panel의 base값
    const {
      state: {
        [this.curr]: { base: pannelBase },
      },
    } = this;
    // 아래 세줄은 base객체에 clear 메서드 넣어서 초기화시켜야함.
    // 지금은 이해를 돕기위해 도메인, 네이티브 분리를 안함.
    console.log(this.base, pannelBase, this.state);
    this.base.innerHTML = '';
    this.base.appendChild(pannelBase);
    pannelBase.style.display = 'block';
    // 현재 심볼에 해당하는 메서드 실행
    this[this.curr]();
  }
  _render(v) {
    const {
      state: { [this.curr]: pannelBase },
    } = this;
    pannelBase.render(v);
  }
  [TState.title]() {
    console.log('title');
    this.stage.clear();
    this.score.clear();
  }
  [TState.stageIntro]() {
    console.log('stage intro');
    this._render(this.stage);
  }
  [TState.play]() {
    const data = new Data(this.row, this.col);
    // TODO ....
    this._render(data); // update
    this._render(Block.block()); // next
  }
  [TState.stageClear]() {}
  [TState.clear]() {}
  [TState.dead]() {}
  [TState.ranking]() {}
};
Object.entries(TState).forEach(([str, symbol]) => (Game[str] = symbol));
Object.freeze(Game);

const game = new Game(
  sel('body'),
  20,
  10,
  {
    game: Game.title,
    selectBase: (game) => {
      sel('#title .start').onclick = () => game.setState(Game.stageIntro);
      return sel('#title');
    },
    render: null,
  },
  {
    game: Game.stageIntro,
    selectBase: (game) => sel('#stageIntro'),
    render: (game, v) => {
      sel('#stageIntro .stage').innerHTML = v;
      setTimeout(() => game.setState(Game.play), 500);
    },
  },
  {
    game: Game.play,
    selectBase: (game) => {
      const t = new TableRenderer(game.row, game.col, '#000');
      sel('#play').appendChild(t.base);
      sel('#play').renderer = t;
      return sel('#play');
    },
    render: (v) => {
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
  },
);

game.setState(Game.title);
