import { Panel } from './panel.js';
import { Score } from './score.js';
import { Stage } from './stage.js';
import { Data } from './data.js';
import { ERR, prop, sel } from './utils/index.js';
import { TableRenderer } from './renderer/table-renderer.js';
import { Block } from './block.js';

const LEFT = 37;
const RIGHT = 39;

const TState = {};
'title,stageIntro,play,stageClear,clear,dead,ranking'.split(',').forEach((v) => (TState[v] = Symbol()));
const Game = class {
  constructor(base, row, col, ...v) {
    const stage = new Stage(10, 500, 1000);
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
    // TODO: 아래 세줄은 base객체에 clear 메서드 넣어서 초기화시켜야함.
    // 지금은 이해를 돕기위해 도메인, 네이티브 분리를 안함.
    this.base.innerHTML = '';
    this.base.appendChild(pannelBase);
    pannelBase.style = '';
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
    this.stage.clear();
    this.score.clear();
  }
  [TState.stageIntro]() {
    this._render(this.stage);
  }
  [TState.play]() {
    const _clearLine = (data) => {
      let line;
      data.forEach((row) => {
        const isClear = row.filter((color) => color === '0').length === 0;
        if (isClear) {
          line++;
          data[row] = Array(this.col).fill('0');
        }
      });
      return line;
    };

    const _move = (data, { color, block }, position, x, y, test = {}) => {
      console.log('move', data, color, block, position, x, y);
      const tempX = position.x + x;
      const tempY = position.y + y;
      block.forEach((blocksRow, i) =>
        blocksRow.forEach((v, j) => data.makeCell(i + tempY, j + tempX, v ? color : '0', test)),
      );
      if (test.isIntersacted) return;
      block.forEach((blocksRow, i) =>
        blocksRow.forEach((v, j) => data.makeCell(i + tempY, j + tempX, v ? color : '0')),
      );
      position.x += x;
      position.y += y;
      this._render(data);
    };

    const next = () => {
      currBlock = Block.block();
      nextBlock = Block.block();
      position.x = parseInt((col - currBlock.block[0].length) * 0.5);
      position.y = -1;
      this._render(nextBlock);
    };

    const { row, col } = this;
    const position = { x: 0, y: 0 };
    const data = new Data(row, col);
    let {
      stage: { count, speed },
    } = this;
    let currBlock;
    let nextBlock;

    const keyInLimit = 100;
    let lastKeyIn = 0;
    this.base.onkeydown = (e) => {
      const now = performance.now();
      let x;
      const y = 0;
      if (now - lastKeyIn > keyInLimit) {
        lastKeyIn = now;
        switch (e.keyCode) {
          case LEFT:
            x = -1;
            break;
          case RIGHT:
            x = +1;
            break;
        }
        _move(data, currBlock, position, x, y);
      }
    };

    next();

    const id = setInterval(() => {
      const test = {};
      _move(data, currBlock, position, 0, 1, test);
      if (test.isIntersacted) {
        const line = _clearLine(data);
        if (line) {
          count -= line;
          if (count < 0) count = 0;
          this.score.add(line);
        }
        if (!count) {
          clearInterval(id);
          return this.setState(Game.stageClear);
        }
        if (data[0].some((v) => v !== '0')) {
          clearInterval(id);
          return this.setState(Game.dead);
        } else next();
      }
    }, speed);
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
    selectBase: (game) => sel('#stage-intro'),
    render: (game, v) => {
      sel('#stage-intro .stage').innerHTML = v;
      setTimeout(() => game.setState(Game.play), 500);
    },
  },
  {
    game: Game.play,
    selectBase: (game) => {
      const tableRenderer = new TableRenderer(game.row, game.col, '#000');
      sel('#play').appendChild(tableRenderer.base);
      sel('#play').renderer = tableRenderer;
      return sel('#play');
    },
    render: (game, v) => {
      sel('#play .stage .stage').innerHTML = game.stage;
      sel('#play .score .curr').innerHTML = game.score.curr;
      sel('#play .score .total').innerHTML = game.score.total;
      switch (true) {
        case v instanceof Data:
          sel('#play').renderer.render(v);
          break;
        case v instanceof Block:
          const { color, block } = v;
          const row = block.length;
          const col = block.reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);
          const tableRenderer = new TableRenderer(row, col, '#fff');
          sel('#play .next').innerHTML = '';
          sel('#play .next').appendChild(tableRenderer.base);
          tableRenderer.render(new Data(row, col).all(...block.map((row) => row.map((v) => (v ? color : '0')))));
          break;
      }
    },
  },
  {
    game: Game.stageClear,
    selectBase: (game) => {
      return sel('#stage-clear');
    },
    render: null,
  },
  {
    game: Game.clear,
    selectBase: (game) => {
      return sel('#clear');
    },
    render: null,
  },
  {
    game: Game.dead,
    selectBase: (game) => {
      sel('#dead .title').onclick = () => game.setState(Game.title);
      return sel('#dead');
    },
    render: null,
  },
);

game.setState(Game.title);
// game.setState(Game.play);
