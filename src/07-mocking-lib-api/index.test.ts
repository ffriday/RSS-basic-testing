// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  const path = 'blabla.bla';
  const data = 'lalala';

  beforeEach(() => {
    jest.useFakeTimers();
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(axios.create().get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(res).toBe(data);
  });
});
