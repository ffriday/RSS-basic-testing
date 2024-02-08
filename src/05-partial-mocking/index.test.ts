// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const origin = jest.requireActual<typeof import('./index')>('./index');
  return {
    ...origin,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    mockOne();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('foo');
    mockTwo();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('bar');
    mockThree();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
