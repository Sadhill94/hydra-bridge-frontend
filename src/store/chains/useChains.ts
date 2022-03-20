import { useCallback, useContext } from "react";

import { StoreContext } from "../StoreContext";
import { ChainResponseDto } from "../../common/dtos";

/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the ChainsReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useChains() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  const { chainsState, chainsDispatch } = useContext(StoreContext);

  // apply the useCallback on dispatch to prevent unnecessary renders
  const setChains = useCallback(
    (chains: ChainResponseDto[]) => chainsDispatch("setChains", chains),
    []
  );

  return {
    setChains,
    getChains: () => chainsState.chains,
  };
}
