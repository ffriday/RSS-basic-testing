// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const getTwoNumbers = (max = 100): [number, number] => [
  Math.floor(Math.random() * max),
  Math.floor(Math.random() * max),
];

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: Action.Subtract });
    expect(result).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(result).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const [a, b] = getTwoNumbers();
    const result = simpleCalculator({ a, b, action: undefined });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const [a, b] = [undefined, undefined];
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(null);
  });
});
