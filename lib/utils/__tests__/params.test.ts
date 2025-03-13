import { getPropFromParams } from '../params';

describe('getPropFromParams', () => {
  test('should convert string number to number', () => {
    const params = { page: '5' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(5);
  });

  test('should return default value (0) when value is NaN', () => {
    const params = { page: 'invalid' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(0);
  });

  test('should use custom default value when provided', () => {
    const params = { page: 'invalid' };
    const result = getPropFromParams(params, 'page', 1);
    expect(result).toBe(1);
  });

  test('should handle zero as string', () => {
    const params = { page: '0' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(0);
  });

  test('should handle negative numbers as string', () => {
    const params = { page: '-1' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(-1);
  });

  test('should handle decimal numbers as string', () => {
    const params = { page: '1.5' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(1.5);
  });
});
