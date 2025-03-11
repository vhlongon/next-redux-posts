import { getPropFromParams } from '../params';

describe('getPropFromParams', () => {
  it('should convert string number to number', () => {
    const params = { page: '5' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(5);
  });

  it('should return default value (0) when value is NaN', () => {
    const params = { page: 'invalid' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(0);
  });

  it('should use custom default value when provided', () => {
    const params = { page: 'invalid' };
    const result = getPropFromParams(params, 'page', 1);
    expect(result).toBe(1);
  });

  it('should handle zero as string', () => {
    const params = { page: '0' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(0);
  });

  it('should handle negative numbers as string', () => {
    const params = { page: '-1' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(-1);
  });

  it('should handle decimal numbers as string', () => {
    const params = { page: '1.5' };
    const result = getPropFromParams(params, 'page');
    expect(result).toBe(1.5);
  });
});
