import { ThemeProvider } from '@/app/Providers/ThemeProvider';
import * as testingLibrary from '@testing-library/react';
import type { ReactNode } from 'react';

const { render: renderReact, ...reactTestingLibraryUtils } = testingLibrary;

type RenderOptions = Parameters<typeof renderReact>[1];

export const render = (ui: ReactNode, options?: RenderOptions) => {
  return testingLibrary.render(<ThemeProvider>{ui}</ThemeProvider>, options);
};

export const {
  act,
  cleanup,
  configure,
  fireEvent,
  getDefaultNormalizer,
  getNodeText,
  getQueriesForElement,
  getRoles,
  isInaccessible,
  logRoles,
  prettyDOM,
  queries,
  queryHelpers,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} = reactTestingLibraryUtils;
