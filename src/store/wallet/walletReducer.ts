import { TokenBalanceDto } from "../../common/dtos";

/**
 * WalletReducer: is called when the dispatch from the useReducer React hook is used/called
 * @param state - the WalletState in our StoreContext
 * @param action - the current action dispatched
 */
export function walletReducer(
  state: IWalletState,
  action: WalletActions
): IWalletState {
  switch (action.type) {
    case "setWalletBalances":
      return {
        ...state,
        walletBalances: action.payload,
      };
    default:
      return state;
  }
}

/**
 * Initial chains state for the WalletReducer on ContextAPI
 */
export const initialWalletState: IWalletState = {
  walletBalances: [],
};

/**
 * Our interface for the ChainsState, used by the WalletReducer
 */
export interface IWalletState {
  walletBalances?: TokenBalanceDto[];
}

/**
 * Custom dispatcher type for WalletReducer
 * Will allow us to dispatch without an object and even without a payload (ref ...payload)
 * eg: dispatch("setChains", aPayload)
 * eg: dispatch("resetChains")
 */
export type WalletDispatcher = <
  Type extends WalletActions["type"],
  Payload extends WalletActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

/**
 * Map the Actions types and their defined payload types
 * Will be use for the WalletActions generated dynamically based on the keys:types here
 * To add a new action for our WalletReducer, we need to add the new key and it's type here
 */
export type WalletActionsMap = {
  setWalletBalances: TokenBalanceDto[];
};

/**
 * Type our action type with the key set in the WalletActionsMap
 * Allow us to as well type the payload for our action, TypeScript friendly
 * eg: {type: "setSelectedToken", payload: TokenResponseDto}
 */
export type WalletActions = {
  [Key in keyof WalletActionsMap]: {
    type: Key;
    payload: WalletActionsMap[Key];
  };
}[keyof WalletActionsMap];
