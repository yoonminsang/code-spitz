import { prop } from './util';

const Panel = class {
  static get(game, init, render) {
    const p = new Panel();
    return p.init(game, init(game), render), p;
  }
  init(game, base, r) {
    prop(this, { base, game, r });
  }
  render(v) {
    this.r(this.game, v);
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
  (game) => sel('#stageIntro'),
  (game, v) => {
    sel('#stageIntro .stage').innerHTML = v;
    setTimeout(() => game.setState(Game.play), 500);
  },
);
