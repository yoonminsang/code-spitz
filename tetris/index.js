const prop = (target, v) => Object.assign(target, v);

const Stage = class {
  constructor(last, min, max, listener) {
    prop(this, { last, min, max, listener });
  }
  clear() {
    this.curr = 0;
    this.next();
  }
  next() {
    if (this.curr++ < Stage.last) {
      const rate = (this.curr - 1) / (this.last - 1);
      this.speed = this.min + (this.max - this.min) * (1 - rate);
      this.listener();
    }
  }
  score(line) {
    return parseInt(this.curr * 5 * 2 ** line);
  }
};

const Score = class {
  constructor(stage, listener) {
    prop(this, { stage, listener });
  }
  clear() {
    this.curr = this.total = 0;
  }
  add(line) {
    const score = this.stage.score(line);
    this.curr += score;
    this.total += score;
    this.listener();
  }
};

const Block = class {
  constructor(color, ...blocks) {
    prop(this, { color, rotate: 0, blocks, count: blocks.length - 1 });
  }
  left() {
    if (--this.rotate < 0) this.rotate = count;
  }
  right() {
    if (++this.rotate > count) this.rotate = 0;
  }
  getBlock() {
    return this.blocks[this.rotate];
  }
};

const blocks = [
  class extends Block {
    constructor() {
      super('#f8cbad', [[1], [1], [1], [1]], [[1, 1, 1, 1]]);
    }
  },
  class extends Block {
    constructor() {
      super(
        '#ffe699',
        [
          [0, 1, 0],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [1, 1],
          [0, 1],
        ]
      );
    }
  },
];

const Data = class extends Array {
  constructor(row, col) {
    prop(this, { row, col });
  }
};

const Renderer = class {
  constructor(col, row) {
    prop(this, { col, row, blocks: [] });
    while (row--) this.blocks.push([]);
  }
  clear() {
    throw 'override';
  }
  render(data) {
    if (!(data instanceof Data)) throw 'invalide data';
    this._render(data);
  }
  _render(data) {
    throw 'override!';
  }
};

const el = (el) => document.createElement(el);
const back = (s, v) => (s.backgroundColor = v);

// base : 표
const TableRenderer = class extends Renderer {
  constructor(base, back, col, row) {
    super(col, row);
    this.back = back;
    while (row--) {
      const tr = base.appendChild(el('tr')),
        curr = [];
      this.blocks.push(curr);
      let i = col;
      while (i--) curr.push(tr.appendChild(el('td')).style);
    }
    this.clear();
  }
  clear() {
    this.blocks.forEach((curr) => curr.foReach((s) => back(s, this.back)));
  }
  _render(v) {
    this.blocks.forEach((curr, row) =>
      curr.forEach((s, col) => back(s, v[row][col]))
    );
  }
};

const CanvasRenderer = class extends Renderer {
  constructor(base, back, col, row) {
    super(col, row);
    prop(this, {
      width: (base.width = parseInt(base.style.width)),
      height: (base.height = parseInt(base.style.height)),
      cellSize: [base.width / col, base.hegiht / row],
      ctx: base.getContext('2d'),
    });
  }
  _render(v) {
    const {
      ctx,
      cellSize: [w, h],
    } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    let i = this.row;
    while (i--) {
      let j = this.col;
      while (j--) {
        ctx.fillStyle = v[i][j];
        ctx.fillRect(j * w, i * h, w, h);
      }
    }
  }
};
