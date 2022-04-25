import { useCallback, useContext, useMemo } from "react";

import { StoreContext } from "../StoreContext";
import {
  BuildAllowanceResponseDto,
  BuildTxResponseDto,
  ChainResponseDto,
  RouteDto,
  TokenResponseDto,
} from "../../common/dtos";

/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the BridgeReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useBridge() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  const { bridgeState, bridgeDispatch } = useContext(StoreContext);
  /**
   * Setters
   * apply the useCallback on dispatch to prevent unnecessary renders
   */

  const setSelectedRoute = useCallback(
    (route: RouteDto) => bridgeDispatch("setSelectedRoute", route),
    []
  );
  const setSelectedToken = useCallback(
    (token: TokenResponseDto[]) => bridgeDispatch("setSelectedToken", token),
    []
  );
  const setSelectedToChain = useCallback(
    (chainTo: ChainResponseDto) =>
      bridgeDispatch("setSelectedToChain", chainTo),
    []
  );
  const setSelectedFromChain = useCallback(
    (chainFrom: ChainResponseDto) =>
      bridgeDispatch("setSelectedFromChain", chainFrom),
    []
  );

  /**
   * Approval's/ TX's
   */
  const setBuildApproveTx = useCallback(
    (buildApproveTx: BuildAllowanceResponseDto) =>
      bridgeDispatch("setBuildApproveTx", buildApproveTx),
    []
  );
  const setBridgeTx = useCallback(
    (bridgeTx: BuildTxResponseDto) => bridgeDispatch("setBridgeTx", bridgeTx),
    []
  );
  const setTxHash = useCallback(
    (txHash: string | undefined) => bridgeDispatch("setTxHash", txHash),
    []
  );

  /**
   * GETTERS
   */
  const getSelectedRoute = useMemo(
    () => bridgeState.selectedRoute,
    [bridgeState.selectedRoute]
  );
  const getSelectedToken = useMemo(
    () => bridgeState.selectedToken,
    [bridgeState.selectedToken]
  );

  const getSelectedChainFrom = useMemo(
    () => bridgeState.chainFrom,
    [bridgeState.chainFrom]
  );
  const getSelectedChainTo = useMemo(
    () => bridgeState.chainTo,
    [bridgeState.chainTo]
  );
  const getBuildApproveTx = useMemo(
    () => bridgeState.buildApproveTx,
    [bridgeState.buildApproveTx]
  );
  const getBridgeTx = useMemo(() => bridgeState.buildTx, [bridgeState.buildTx]);

  const getTxHash = useMemo(() => bridgeState.txHash, [bridgeState.txHash]);

  return {
    setSelectedRoute,
    setSelectedToken,
    setSelectedFromChain,
    setSelectedToChain,
    setBuildApproveTx,
    setBridgeTx,
    setTxHash,
    getSelectedRoute,
    getSelectedToken,
    getSelectedChainFrom,
    getSelectedChainTo,
    getBuildApproveTx,
    getBridgeTx,
    getTxHash,
  };
}
