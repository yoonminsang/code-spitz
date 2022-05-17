import { prop } from './util';

const Panel = class {
  // TODO: selectBase가 왜 필요한지 모르겠다. 나중에 살펴보자
  static get(game, selectBase, _render) {
    const p = new Panel();
    p.init(game, selectBase(game), _render);
    return p;
  }
  init(game, base, _render) {
    prop(this, { game, base, _render });
  }
  render(v) {
    this._render(this.game, v);
  }
};

{
  /* <div id="stageIntro">
  <div>Stage</div>
  <div class="stage"></div>
</div>; */
}
Panel.get(
  game,
  (game) => document.querySelector('#stageIntro'),
  (game, v) => {
    document.querySelector('#stageIntro .stage').innerHTML = v;
    setTimeout(() => game.setState(Game.play), 500);
  },
);
