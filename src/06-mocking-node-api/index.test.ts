// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { jest } from '@jest/globals';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fn = jest.fn();
    const time = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(fn, time);
    expect(setTimeout).toHaveBeenCalledWith(fn, time);
  });

  test('should call callback only after timeout', () => {
    const fn = jest.fn();
    const time = 1000;
    doStuffByTimeout(fn, time);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(fn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const fn = jest.fn();
    const time = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(fn, time);
    expect(setInterval).toHaveBeenCalledWith(fn, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fn = jest.fn();
    const time = 1000;
    const intervals = 10;
    doStuffByInterval(fn, time);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time * intervals);
    expect(fn).toHaveBeenCalledTimes(intervals);
  });
});

describe('readFileAsynchronously', () => {
  const file = 'test.txt';
  const content = 'lalalalalalla hehehehehhee hohohohohohoh';
  jest.mock('path');
  jest.mock('fs');
  jest.mock('fs/promises');

  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously(file);
    expect(join).toBeCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const res = await readFileAsynchronously('index.ts');
    expect(res).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValueOnce(new Promise((resolve) => resolve(file + content)));
    const res = await readFileAsynchronously(file);
    expect(res).toBe(file + content);
  });
});
