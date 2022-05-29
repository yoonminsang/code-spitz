var Shipping = function () {
  this.company = '';
};

Shipping.prototype = {
  setStrategy: function (company) {
    this.company = company;
  },

  calculate: function (package) {
    return this.company.calculate(package);
  },
};

var UPS = function () {
  this.calculate = function (package) {
    // calculations...
    return '$45.95';
  };
};

var USPS = function () {
  this.calculate = function (package) {
    // calculations...
    return '$39.40';
  };
};

var Fedex = function () {
  this.calculate = function (package) {
    // calculations...
    return '$43.20';
  };
};

function run() {
  var package = { from: '76712', to: '10012', weigth: 'lkg' };

  // the 3 strategies

  var ups = new UPS();
  var usps = new USPS();
  var fedex = new Fedex();

  var shipping = new Shipping();

  shipping.setStrategy(ups);
  console.log('UPS Strategy: ' + shipping.calculate(package));
  shipping.setStrategy(usps);
  console.log('USPS Strategy: ' + shipping.calculate(package));
  shipping.setStrategy(fedex);
  console.log('Fedex Strategy: ' + shipping.calculate(package));
}

class QuackQuack {
  do() {
    this.복잡한함수1()
    this.복잡한함수2()
    console.log(‘꽥꽥꽥‘)
  }
  복잡한함수1 () {}
  복잡한함수2 () {}
}
class QuackQuack2 {
  do() {
    this.복잡한함수1();
    console.log(“꽥꽥꽥“);
  }
  복잡한함수1() {}
}
class NoFly {
  do() {
    console.log(“난 못날아“);
  }
}
class DuckFactory {
  static getDuck(type) {
    if (type === “청둥오리“) {
      return new Duck(new QuackQuack(), new NoFly());
    } else if (type === “오리종류1”) {
      new Duck(new QuackQuack2(), new Fly1());
    } else if (type === “오리종류2") {
      new Duck(new QuackQuack(), new Fly2());
    } else if (type === “오리종류3”) {
      new Duck(new QuackQuack(), new Fly3());
    } else if (type === “오리종류4") {
      new Duck(new QuackQuack(), new Fly4());
    } else if (type === “오리종류5”) {
      new Duck(new QuackQuack(), new Fly5());
    }
  }
}
class Duck {
  quack
  fly
  constructor(quack, fly) {
    this.quack = quack
    this.fly = fly
  }
  quack() {
    this.quack.do()
  }
  fly() {
    this.fly.do()
  }
}
class 청둥오리 extends Duck {
}
function run() {
  const 오리1 = DuckFactory.getDuck(‘청둥오리’)
  오리1.quack()
}