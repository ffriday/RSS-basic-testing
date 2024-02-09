// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 6, b: 6, action: Action.Multiply, expected: 36 },
  { a: 100, b: 5, action: Action.Divide, expected: 20 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 6, b: 6, action: undefined, expected: null },
  { a: undefined, b: undefined, action: Action.Add, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    '$action: %a %b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
    30000,
  );
  // Consider to use Jest table tests API to test all cases above
});
