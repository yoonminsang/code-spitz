class QuackQuack {
  do() {
    this.복잡한함수1();
    this.복잡한함수2();
    console.log('꽥꽥꽥');
  }
  복잡한함수1() {}
  복잡한함수2() {}
}
class QuackQuack2 {
  do() {
    this.복잡한함수1();
    console.log('꽥꽥꽥꽥');
  }
  복잡한함수1() {}
}
class NoFly {
  do() {
    console.log('난 못날아');
  }
}
class DuckFactory {
  static getDuck(type) {
    switch (type) {
      case '청둥오리':
        return new Duck(new QuackQuack(), new NoFly());
      case '오리종류1':
        return new Duck(new QuackQuack2(), new Fly1());
      case '오리종류2':
        return new Duck(new QuackQuack2(), new Fly2());
      case '오리종류3':
        return new Duck(new QuackQuack2(), new Fly3());
      case '오리종류4':
        return new Duck(new QuackQuack2(), new Fly4());
      case '오리종류5':
        return new Duck(new QuackQuack2(), new Fly5());
    }
  }
}
class Duck {
  quack;
  fly;
  constructor(quack, fly) {
    this.quack = quack;
    this.fly = fly;
  }
  quack() {
    this.quack.do();
  }
  fly() {
    this.fly.do();
  }
}
class 청둥오리 extends Duck {}
function run() {
  const 청둥오리 = DuckFactory.getDuck('청둥오리');
  청둥오리.quack.do();
  청둥오리.fly.do();
}
run();
