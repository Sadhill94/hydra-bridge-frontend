/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the BridgeReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useBridge() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  // const { bridgeState, bridgeDispatch } = useContext(StoreContext);

  return {
    aMethod: () => [],
  };
}
