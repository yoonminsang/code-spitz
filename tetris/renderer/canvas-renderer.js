import { Renderer } from './renderer';

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
