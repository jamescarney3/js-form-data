'use-strict';

import sum from '../src/sum';

test('sum does adding', () => {
  expect(sum(1, 2)).toBe(3);
});