import { useRef } from 'react';
import { AppStore } from '../store';
import { useAppStore } from './storeHooks';

type Action = Parameters<AppStore['dispatch']>[0];

export const useLoadStore = (action: Action) => {
  // Initialize the store with the product information
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(action);
    initialized.current = true;
  }

  return store;
};
