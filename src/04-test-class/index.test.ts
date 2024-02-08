import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let accountForTest: BankAccount;

  beforeEach(() => {
    accountForTest = getBankAccount(150);
  });

  test('should create account with initial balance', () => {
    // Write your test here
    expect(accountForTest).toBeInstanceOf(BankAccount);
    expect(accountForTest.getBalance()).toBe(150);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => accountForTest.withdraw(200)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const toTestAccout = getBankAccount(100);
    expect(() => accountForTest.transfer(200, toTestAccout)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => accountForTest.transfer(100, accountForTest)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Write your test here
    expect(accountForTest.deposit(100).getBalance()).toBe(250);
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(accountForTest.withdraw(100).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const toTestAccout = getBankAccount(250);
    expect(accountForTest.transfer(50, toTestAccout).getBalance()).toBe(100);
    expect(toTestAccout.getBalance()).toBe(300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(50);
    const result = await accountForTest.fetchBalance();
    expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(60);
    await accountForTest.synchronizeBalance();
    expect(accountForTest.getBalance()).toBe(60);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    accountForTest.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(accountForTest.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
