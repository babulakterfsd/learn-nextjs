import { createContext } from 'react';
import GlobalStates from '../hooks/useDeclareGlobalStates';

export const GlobalStatesContext = createContext({} as any);

function GlobalStatesProvider({ children }: any) {
  const allContexts = GlobalStates();
  return (
    <GlobalStatesContext.Provider value={allContexts}>
      {children}
    </GlobalStatesContext.Provider>
  );
}

export default GlobalStatesProvider;
