import React, { useContext, createContext, FC } from 'react';
import { useImmerReducer } from 'use-immer';

export enum AppActionTypes {
  SetUrl = 'SetUrl',
}

type State = {
  url: string;
};

type Action = { type: AppActionTypes.SetUrl; url: string };

const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case AppActionTypes.SetUrl: {
      draft.url = action.url;
      break;
    }

    default:
      throw new Error('Unknown action type in AppProvider reducer');
  }
};

type Dispatch = (action: Action) => void;

const AppContext = createContext<State | undefined>(undefined);
const ProviderContext = createContext<Dispatch | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer<State>(reducer, {
    url: '/',
  });

  return (
    <AppContext.Provider value={state}>
      <ProviderContext.Provider value={dispatch}>{children}</ProviderContext.Provider>
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppState = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppState must be used within the AppStateContext');
  }

  return context;
};

export const useAppDispatch = () => {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error('useAppDispatch must be used within the AppProviderContext');
  }

  return context;
};
