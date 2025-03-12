import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';

export const compressData = (data: unknown) => {
  const compressed = compressToEncodedURIComponent(JSON.stringify(data));
  return compressed;
};

export const decompressData = <T>(compressedData: string) => {
  const decoded = decompressFromEncodedURIComponent(compressedData);
  return JSON.parse(decoded) as T;
};
