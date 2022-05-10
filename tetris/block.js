// import { prop } from './util';
const prop = (target, value) => Object.assign(target, value);

// const Block = class {
//   constructor(color, ...blocks) {
//     prop(this, { color, rotate: 0, blocks, count: blocks.length - 1 });
//   }
//   left() {
//     if (--this.rotate < 0) this.rotate = count;
//   }
//   right() {
//     if (++this.rotate > count) this.rotate = 0;
//   }
//   getBlock() {
//     return this.blocks[this.rotate];
//   }
// };

// const blocks = [
//   class extends Block {
//     constructor() {
//       super('#f8cbad', [[1], [1], [1], [1]], [[1, 1, 1, 1]]);
//     }
//   },
//   class extends Block {
//     constructor() {
//       super(
//         '#ffe699',
//         [
//           [0, 1, 0],
//           [1, 1, 1],
//         ],
//         [
//           [1, 0],
//           [1, 1],
//           [1, 0],
//         ],
//         [
//           [1, 1, 1],
//           [0, 1, 0],
//         ],
//         [
//           [0, 1],
//           [1, 1],
//           [0, 1],
//         ],
//       );
//     }
//   },
// ];

const Block = ((_) => {
  const strToBlock = (v) => v.split(',').map((v) => v.split('|').map((v) => v.split('')));
  const makeBlock = (color, block) =>
    class extends Block {
      constructor() {
        super(color, block);
      }
    };
  const Block = class {
    static block() {
      return new this.blocks[parseInt(Math.random() * this.blocks.length)]();
    }
    constructor(color, strBlocks) {
      const blocks = strToBlock(strBlocks);
      prop(this, { color, blocks, rotate: 0, count: blocks.length - 1 });
    }
    left() {
      if (--this.rotate < 0) this.rotate = count;
    }
    right() {
      if (++this.rotate > count) this.rotate = 0;
    }
    get block() {
      return this.blocks[this.rotate];
    }
  };
  Block.blocks = [
    '#00C3ED-1|1|1|1,1111',
    '#FBD72B-11|11',
    '#B84A9C-010|111,10|11|10,111|010,01|11|01',
    '#00FF24-011|110,10|11|01,011|110,10|11|01',
  ].map((v) => makeBlock(...v.split('-')));
  return Block;
})();
