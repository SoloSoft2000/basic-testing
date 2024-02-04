import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const acc = getBankAccount(123);

  test('should create account with initial balance', () => {
    // Write your test here
    expect(acc instanceof BankAccount).toBeTruthy();
    expect(acc.getBalance()).toBe(123);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => acc.withdraw(124)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() => acc.transfer(124, new BankAccount(100))).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => acc.transfer(100, acc)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    expect(acc.deposit(100).getBalance()).toBe(223);
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(acc.withdraw(100).getBalance()).toBe(123);
  });

  test('should transfer money', () => {
    // Write your test here
    const toAcc = getBankAccount(277);
    expect(acc.transfer(23, toAcc).getBalance()).toBe(100);
    expect(toAcc.getBalance()).toBe(300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(50);
    const result = await acc.fetchBalance();
    expect(result).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(50);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(acc, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(acc.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
