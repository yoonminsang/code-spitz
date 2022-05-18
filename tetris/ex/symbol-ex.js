const Test = (() => {
  const field1 = Symbol(),
    field2 = Symbol(),
    method1 = Symbol();
  return class {
    constructor(a, b) {
      this[field1] = a;
      this[field2] = b;
    }
    [method1]() {}
    action(a) {
      this[method1]();
      this[field1] = a;
    }
  };
})();

const t = new Test(1, 2);
t[Object.getOwnPropertySymbols(t)[0]];

const Test2 = (() => {
  const prop = new WeakMap();
  return class {
    constructor(a, b) {
      const p = prop.set(this, {});
      p.a = a;
      p.b = b;
    }
    action(a) {
      const p = prop.get(this);
      p.a = a;
    }
  };
})();
