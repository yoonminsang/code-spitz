const s = {};
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
Object.entries(s).forEach(([k, v]) => (Game[k] = v));
Object.freeze(Game);
