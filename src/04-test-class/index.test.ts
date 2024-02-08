// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

jest.mock('lodash');
const mockedRandom = lodash.random as jest.MockedFunction<typeof lodash.random>;

describe('BankAccount', () => {
  let balance = 0;
  let acc = getBankAccount(0);

  beforeEach(() => {
    balance = Math.floor(Math.random() * 10000 + 1000);
    acc = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => acc.withdraw(100)).not.toThrow();
    expect(() => acc.withdraw(100000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const destAcc = getBankAccount(0);
    expect(() => acc.transfer(100, destAcc)).not.toThrow();
    expect(() => acc.transfer(10000, destAcc)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => acc.transfer(100, acc)).toThrow();
  });

  test('should deposit money', () => {
    const dep = 100;
    acc.deposit(dep);
    expect(acc.getBalance()).toBe(balance + dep);
  });

  test('should withdraw money', () => {
    const dep = 100;
    acc.withdraw(dep);
    expect(acc.getBalance()).toBe(balance - dep);
  });

  test('should transfer money', () => {
    const startBalance = 1100;
    const dep = 100;
    const destAcc = getBankAccount(startBalance);
    acc.transfer(dep, destAcc);
    expect(destAcc.getBalance()).toBe(startBalance + dep);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const num = 12345;
    mockedRandom.mockReturnValue(num);
    await expect(acc.fetchBalance()).resolves.toBe(num);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const num = 12345;
    mockedRandom.mockReturnValue(num);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(num);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const num = 0;
    mockedRandom.mockReturnValue(num);
    await expect(() => acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
