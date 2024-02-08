// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const elements = [1, 2, 3];
    const list = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    };

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const elements = [1, 2, 3];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});
