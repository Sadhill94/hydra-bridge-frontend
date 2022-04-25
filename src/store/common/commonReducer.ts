/**
 * CommonReducer: is called when the dispatch from the useReducer React hook is used/called
 * @param state - the CommonState in our StoreContext
 * @param action - the current action dispatched
 */
export function commonReducer(
  state: ICommonDispatcher,
  action: CommonActions
): ICommonDispatcher {
  switch (action.type) {
    case "setIsDisabled":
      return {
        ...state,
        isDisabled: action.payload,
      };
    case "setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "setAreRoutesVisible":
      return {
        ...state,
        areRoutesVisible: action.payload,
      };
    default:
      return state;
  }
}

/**
 * Initial chains state for the CommonReducer on ContextAPI
 */
export const initialCommonState: ICommonDispatcher = {
  isDisabled: true,
  isLoading: true,
  areRoutesVisible: false,
};

/**
 * Our interface for the ChainsState, used by the CommonReducer
 */
export interface ICommonDispatcher {
  isDisabled: boolean;
  isLoading: boolean;
  areRoutesVisible: boolean;
}

/**
 * Custom dispatcher type for CommonReducer
 * Will allow us to dispatch without an object and even without a payload (ref ...payload)
 * eg: dispatch("setChains", aPayload)
 * eg: dispatch("resetChains")
 */
export type CommonDispatcher = <
  Type extends CommonActions["type"],
  Payload extends ICommonActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

/**
 * Map the Actions types and their defined payload types
 * Will be use for the CommonActions generated dynamically based on the keys:types here
 * To add a new action for our CommonReducer, we need to add the new key and it's type here
 */
export type ICommonActionsMap = {
  setIsDisabled: boolean;
  setIsLoading: boolean;
  setAreRoutesVisible: boolean;
};

/**
 * Type our action type with the key set in the ICommonActionsMap
 * Allow us to as well type the payload for our action, TypeScript friendly
 * eg: {type: "setSelectedToken", payload: TokenResponseDto}
 */
export type CommonActions = {
  [Key in keyof ICommonActionsMap]: {
    type: Key;
    payload: ICommonActionsMap[Key];
  };
}[keyof ICommonActionsMap];
