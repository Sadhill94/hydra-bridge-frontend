import {
  BuildAllowanceResponseDto,
  BuildTxResponseDto,
  ChainResponseDto,
  RouteDto,
  TokenResponseDto,
} from "../../common/dtos";

/**
 * BridgeReducer: is called when the dispatch from the useReducer React hook is used/called
 * @param state - the BridgeState in our StoreContext
 * @param action - the current action dispatched
 */
export function bridgeReducer(
  state: IBridgeState,
  action: BridgeActions
): IBridgeState {
  switch (action.type) {
    case "setSelectedRoute":
      return {
        ...state,
        selectedRoute: action.payload,
      };
    case "setSelectedToken":
      return {
        ...state,
        selectedToken: action.payload,
      };
    case "setSelectedFromChain":
      return {
        ...state,
        selectedFromChain: action.payload,
      };
    case "setSelectedToChain":
      return {
        ...state,
        selectedToChain: action.payload,
      };
    case "setBuildApproveTx":
      return {
        ...state,
        buildApproveTx: action.payload,
      };
    case "setBridgeTx":
      return {
        ...state,
        bridgeTx: action.payload,
      };
    case "setTxHash":
      return {
        ...state,
        txHash: action.payload,
      };
    default:
      return state;
  }
}

/**
 * Initial chains state for the BridgeReducer on ContextAPI
 */
export const initialBridgeState: IBridgeState = {
  selectedRoute: undefined,
};

/**
 * Our interface for the ChainsState, used by the BridgeReducer
 */
export interface IBridgeState {
  selectedRoute?: RouteDto;
  selectedToken?: TokenResponseDto;
  selectedFromChain?: ChainResponseDto;
  selectedToChain?: ChainResponseDto;
  buildApproveTx?: BuildAllowanceResponseDto;
  bridgeTx?: BuildTxResponseDto;
  txHash?: string;
}

/**
 * Custom dispatcher type for BridgeReducer
 * Will allow us to dispatch without an object and even without a payload (ref ...payload)
 * eg: dispatch("setChains", aPayload)
 * eg: dispatch("resetChains")
 */
export type BridgeDispatcher = <
  Type extends BridgeActions["type"],
  Payload extends BridgeActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

/**
 * Map the Actions types and their defined payload types
 * Will be use for the BridgeActions generated dynamically based on the keys:types here
 * To add a new action for our BridgeReducer, we need to add the new key and it's type here
 */
export type BridgeActionsMap = {
  setSelectedRoute: RouteDto;
  setSelectedToken: TokenResponseDto;
  setSelectedFromChain: ChainResponseDto;
  setSelectedToChain: ChainResponseDto;
  setBuildApproveTx: BuildAllowanceResponseDto;
  setBridgeTx: BuildTxResponseDto;
  setTxHash: string;
};

/**
 * Type our action type with the key set in the BridgeActionsMap
 * Allow us to as well type the payload for our action, TypeScript friendly
 * eg: {type: "setSelectedToken", payload: TokenResponseDto}
 */
export type BridgeActions = {
  [Key in keyof BridgeActionsMap]: {
    type: Key;
    payload: BridgeActionsMap[Key];
  };
}[keyof BridgeActionsMap];
