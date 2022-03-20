import {
  ChainResponseDto,
  RouteDto,
  TokenResponseDto,
} from "../../common/dtos";

/**
 * ChainsReducers: is called when the dispatch from the useReducer React hook is used/called
 * @param state - the ChainsState in our StoreContext
 * @param action - the current action dispatched
 */
export function chainsReducer(
  state: IChainsState,
  action: ChainsActions
): IChainsState {
  switch (action.type) {
    case "setChains":
      return {
        ...state,
        chains: action.payload,
      };
    case "setTokens":
      return {
        ...state,
        tokens: action.payload,
      };
    case "setRoutes":
      return {
        ...state,
        routes: action.payload,
      };
    default:
      return state;
  }
}

/**
 * Initial chains state for the ChainsReducer on ContextAPI
 */
export const initialChainsState: IChainsState = {
  chains: [],
  tokens: [],
  routes: [],
};

/**
 * Our interface for the ChainsState, used by the ChainsReducer
 */
export interface IChainsState {
  chains: ChainResponseDto[];
  tokens: TokenResponseDto[];
  routes: RouteDto[];
}

/**
 * Custom dispatcher type for ChainsReducer
 * Will allow us to dispatch without an object and even without a payload (ref ...payload)
 * eg: dispatch("setChains", aPayload)
 * eg: dispatch("resetChains")
 */
export type ChainsDispatcher = <
  Type extends ChainsActions["type"],
  Payload extends ChainsActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

/**
 * Map the Actions types and their defined payload types
 * Will be use for the ChainsActions generated dynamically based on the keys:types here
 * To add a new action for our ChainsReducer, we need to add the new key and it's type here
 */
export type ChainsActionsMap = {
  setChains: ChainResponseDto[];
  setTokens: TokenResponseDto[];
  setRoutes: RouteDto[];
};

/**
 * Type our action type with the key set in the ChainsActionsMap
 * Allow us to as well type the payload for our action, TypeScript friendly
 * eg: {type: "setChains", payload: ChainsResponseDto[]}
 */
export type ChainsActions = {
  [Key in keyof ChainsActionsMap]: {
    type: Key;
    payload: ChainsActionsMap[Key];
  };
}[keyof ChainsActionsMap];
