// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

jest.mock('axios');
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: 'Responsed!' });
    jest.spyOn(axios, 'create').mockReturnThis();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    expect(axios.create).not.toHaveBeenCalled();
    await throttledGetDataFromApi('/tests');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    expect(axios.create).not.toHaveBeenCalled();
    await throttledGetDataFromApi('/tests');
    expect(axios.get).toHaveBeenCalledWith(`/tests`);
  });

  test('should return response data', async () => {
    // Write your test here
    expect(axios.create).not.toHaveBeenCalled();
    const result = await throttledGetDataFromApi('/tests');
    expect(result).toEqual('Responsed!');
  });
});
