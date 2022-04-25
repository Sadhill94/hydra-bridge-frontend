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

import {
  BridgeActions,
  BridgeDispatcher,
  bridgeReducer,
  initialBridgeState,
} from "./bridge/bridgeReducer";

import {
  WalletActions,
  WalletDispatcher,
  walletReducer,
  initialWalletState,
} from "./wallet/walletReducer";

export const StoreContext = createContext<any>({});

type StoreProviderProps = {
  children?: ReactNode;
};
export const StoreProvider = ({ children }: StoreProviderProps) => {
  /* ===================================
   *  SETUP REDUCERS
   * ================================= */
  const [chainsState, _chainsDispatch] = useReducer(
    chainsReducer,
    initialChainsState
  );
  const [bridgeState, _bridgeDispatch] = useReducer(
    bridgeReducer,
    initialBridgeState
  );

  const [walletState, _walletDispatch] = useReducer(
    walletReducer,
    initialWalletState
  );

  /* ===================================
   *  SETUP CUSTOM DISPATCHERS
   * ================================= */
  // allow us to use dispatch(<type>, <payload>)` instead of dispatch({ type: <type>, payload: <payload> })
  const chainsDispatch: ChainsDispatcher = useCallback((type, ...payload) => {
    _chainsDispatch({ type, payload: payload[0] } as ChainsActions);
  }, []);

  const bridgeDispatch: BridgeDispatcher = useCallback((type, ...payload) => {
    _bridgeDispatch({ type, payload: payload[0] } as BridgeActions);
  }, []);

  const walletDispatch: WalletDispatcher = useCallback((type, ...payload) => {
    _walletDispatch({ type, payload: payload[0] } as WalletActions);
  }, []);

  /* ===================================
   *  SETUP WRAPPED CONTEXTS
   * ================================= */
  // wrap the chainsContext under useMemo to prevent excessive re-renders on states levels
  // when a another one is updated
  const chainsContext = useMemo(
    () => ({ chainsState, chainsDispatch }),
    [chainsState]
  );

  const bridgeContext = useMemo(
    () => ({ bridgeState, bridgeDispatch }),
    [bridgeState]
  );

  const walletContext = useMemo(
    () => ({ walletState, walletDispatch }),
    [walletState]
  );

  return (
    <StoreContext.Provider
      value={{ ...chainsContext, ...bridgeContext, ...walletContext }}
    >
      {children}
    </StoreContext.Provider>
  );
};