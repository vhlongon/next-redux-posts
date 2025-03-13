import { compressData, decompressData } from '../compression';

describe('Data Compression', () => {
  const testData = { name: 'name', type: 'type' };

  test('should compress and decompress data correctly', () => {
    const compressedData = compressData(testData);
    const decompressedData = decompressData(compressedData);

    expect(decompressedData).toEqual(testData);
  });

  test('should handle empty data', () => {
    const emptyData = {};
    const compressedData = compressData(emptyData);
    const decompressedData = decompressData(compressedData);

    expect(decompressedData).toEqual(emptyData);
  });

  test('should handle invalid compressed data', () => {
    const invalidCompressedData = 'invalidData';
    const decompressedData = decompressData(invalidCompressedData);

    expect(decompressedData).toBeNull();
  });
});
