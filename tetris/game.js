const state = {};
'title,stageIntro,play,dead,stageClear,clear,ranking'.split(',').forEach((v) => (s[v] = Symbol()));
const Game = class {
  [s.title]() {}
  [s.stageIntro]() {}
  [s.play]() {}
  [s.stageClear]() {}
  [s.dead]() {}
  [s.clear]() {}
  [s.ranking]() {}
};
Object.entries(state).forEach(([str, symbol]) => (Game[str] = symbol));
Object.freeze(Game);
