import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from "react";

import {
  ChainsActions,
  ChainsDispatcher,
  chainsReducer,
  initialChainsState,
} from "./chains/chainsReducer";

export const StoreContext = createContext<any>({});

type StoreProviderProps = {
  children?: ReactNode;
};
export const StoreProvider = ({ children }: StoreProviderProps) => {
  /* ===================================
   *  CHAINS REDUCER RELATED
   * ================================= */
  const [chainsState, _chainsDispatch] = useReducer(
    chainsReducer,
    initialChainsState
  );

  // allow us to use dispatch(<type>, <payload>)` instead of dispatch({ type: <type>, payload: <payload> })
  const chainsDispatch: ChainsDispatcher = useCallback((type, ...payload) => {
    _chainsDispatch({ type, payload: payload[0] } as ChainsActions);
  }, []);

  // wrap the chainsContext under useMemo to prevent excessive re-renders on states levels
  // when a another one is updated
  const chainsContext = useMemo(
    () => ({ chainsState, chainsDispatch }),
    [chainsState]
  );

  return (
    <StoreContext.Provider value={chainsContext}>
      {children}
    </StoreContext.Provider>
  );
};
