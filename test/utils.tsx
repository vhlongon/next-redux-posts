import { StoreProvider } from '@/app/Providers/StoreProvider';
import { ThemeProvider } from '@/app/Providers/ThemeProvider';
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as testingLibrary from '@testing-library/react';
import type { ReactNode } from 'react';

const { render: renderReact, ...reactTestingLibraryUtils } = testingLibrary;

type RenderOptions = Parameters<typeof renderReact>[1];

export const render = (ui: ReactNode, options?: RenderOptions) => {
  return testingLibrary.render(
    <ThemeProvider>
      <StoreProvider>{ui}</StoreProvider>
    </ThemeProvider>,
    options
  );
};

export const {
  // this are also available in the testing-library/react package
  // act,
  // cleanup,
  // configure,
  // fireEvent,
  // getDefaultNormalizer,
  // getNodeText,
  // getQueriesForElement,
  // getRoles,
  // isInaccessible,
  // logRoles,
  // prettyDOM,
  // queries,
  // queryHelpers,
  // waitFor,
  // waitForElementToBeRemoved,
  // within,
  screen
} = reactTestingLibraryUtils;
