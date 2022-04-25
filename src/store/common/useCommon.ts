import { useCallback, useContext, useMemo } from "react";

import { StoreContext } from "../StoreContext";

/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the BridgeReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useCommon() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  const { commonState, commonDispatch } = useContext(StoreContext);

  /**
   * Setters
   * apply the useCallback on dispatch to prevent unnecessary renders
   */

  const setIsDisabled = useCallback(
    (isDisabled: boolean) => commonDispatch("setIsDisabled", isDisabled),
    []
  );
  const setIsLoading = useCallback(
    (isLoading: boolean) => commonDispatch("setIsLoading", isLoading),
    []
  );
  const setAreRoutesVisible = useCallback(
    (areRoutesVisible: boolean) =>
      commonDispatch("setAreRoutesVisible", areRoutesVisible),
    []
  );

  /**
   * GETTERS
   */
  const isDisabled: boolean = useMemo(
    () => commonState.isDisabled,
    [commonState.isDisabled]
  );
  const isLoading: boolean = useMemo(
    () => commonState.isLoading,
    [commonState.isLoading]
  );

  const areRoutesVisible: boolean = useMemo(
    () => commonState.areRoutesVisible,
    [commonState.areRoutesVisible]
  );

  return {
    setIsDisabled,
    setIsLoading,
    setAreRoutesVisible,
    isDisabled,
    isLoading,
    areRoutesVisible,
  };
}
