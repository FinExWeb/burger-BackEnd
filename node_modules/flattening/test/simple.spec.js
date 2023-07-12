const flattening = require('../src');
const { strict: assert } = require('assert');

describe('flattening', () => {
  describe('simple', () => {
    const obj = {a: 1, b: '2', e: {x: 9}, 'd.d': 'd'};
    obj.c = obj.e;
    obj['"e"'] = 55;

    const result = flattening(obj);

    it('check flat object', async () => {
        assert.deepStrictEqual(result, { a: 1, b: '2', 'e.x': 9, '"d.d"': 'd', 'c.x': 9, '"e"': 55 });
    });
  });
});
