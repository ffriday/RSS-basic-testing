// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

const makeList = <T>(elements: T[]): LinkedListNode<T> => {
  if (!elements.length) {
    return { value: null, next: null };
  }

  const [head, ...rest] = elements;

  return {
    value: head ?? null,
    next: generateLinkedList(rest),
  };
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    expect(generateLinkedList(arr)).toStrictEqual(makeList(arr));
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const arr = ['foo', 'bar', 'baz'];
    expect(generateLinkedList(arr)).toMatchSnapshot();
  });
});
