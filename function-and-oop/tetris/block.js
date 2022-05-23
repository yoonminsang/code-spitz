import { prop } from './utils';

export const Block = (() => {
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
    constructor(color, blocks) {
      prop(this, { color, blocks, rotate: 0, count: blocks.length - 1 });
    }
    left() {
      if (--this.rotate < 0) this.rotate = this.count;
    }
    right() {
      if (++this.rotate > this.count) this.rotate = 0;
    }
    get block() {
      return this.blocks[this.rotate];
    }
  };
  Block.blocks = [
    {
      color: '#00C3ED',
      blocks: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],
    },
    {
      color: '#FBD72B',
      blocks: [
        [
          [1, 1],
          [1, 1],
        ],
      ],
    },
    {
      color: '#B84A9C',
      blocks: [
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
        ],
      ],
    },
    {
      color: '#00FF24',
      blocks: [
        [
          [0, 1, 1],
          [1, 1],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      ],
    },
    {
      color: '#FF1920',
      blocks: [
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      ],
    },
    {
      color: '#2900FC',
      blocks: [
        [
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 0, 1],
        ],
        [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
      ],
    },
    {
      color: '#FD7C31',
      blocks: [
        [
          [0, 0, 1],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
      ],
    },
  ].map(({ color, blocks }) => makeBlock(color, blocks));
  return Block;
})();
// new Block.blocks[0]으로 접근

// export const Block = (() => {
//   const strToBlock = (v) => v.split(',').map((v) => v.split('|').map((v) => v.split('')));
//   const makeBlock = (color, block) =>
//     class extends Block {
//       constructor() {
//         super(color, block);
//       }
//     };
//   const Block = class {
//     static block() {
//       return new this.blocks[parseInt(Math.random() * this.blocks.length)]();
//     }
//     constructor(color, strBlocks) {
//       const blocks = strToBlock(strBlocks);
//       prop(this, { color, blocks, rotate: 0, count: blocks.length - 1 });
//     }
//     left() {
//       if (--this.rotate < 0) this.rotate = this.count;
//     }
//     right() {
//       if (++this.rotate > this.count) this.rotate = 0;
//     }
//     get block() {
//       return this.blocks[this.rotate];
//     }
//   };
//   Block.blocks = [
//     '#00C3ED-1|1|1|1,1111',
//     '#FBD72B-11|11',
//     '#B84A9C-010|111,10|11|10,111|010,01|11|01',
//     '#00FF24-011|110,10|11|01,011|110,10|11|01',
//     '#FF1920-110|011,01|11|10,110|011,01|11|10',
//     '#2900FC-100|111,11|10|10,111|001,01|01|11',
//     '#FD7C31-001|111,10|10|11,111|100,11|01|01',
//   ].map((v) => makeBlock(...v.split('-')));
//   return Block;
// })();
// new Block.blocks[0]으로 접근
