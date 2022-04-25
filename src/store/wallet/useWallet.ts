import { useCallback, useContext, useMemo } from "react";
import { useWeb3 } from "@chainsafe/web3-context";

import { StoreContext } from "../StoreContext";
import { TokenBalanceDto } from "../../common/dtos";

/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the BridgeReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useWallet() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  const { walletState, walletDispatch } = useContext(StoreContext);
  // vendor
  const { onboard, wallet, address = "", network } = useWeb3();

  /**
   * Setters
   * apply the useCallback on dispatch to prevent unnecessary renders
   */

  const setWalletBalances = useCallback(
    (balances: TokenBalanceDto[]) =>
      walletDispatch("setWalletBalances", balances),
    []
  );

  /**
   * GETTERS
   */
  const getWalletBalances: TokenBalanceDto[] = useMemo(
    () => walletState.walletBalances,
    [walletState.walletBalances]
  );

  const getIsWrongNetwork: boolean = useMemo(
    () => parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID!) !== network,
    [network]
  );

  const getWalletAddress: string = useMemo(() => address, [address]);

  const getWalletNetwork: number | undefined = useMemo(
    () => network,
    [network]
  );

  const getUserWallet = useMemo(() => wallet, [wallet]);

  /**
   * WEB3 VENDOR
   */
  const connectWallet = useCallback(async () => {
    if (!getUserWallet) {
      await onboard?.walletSelect();
    }
    await onboard?.walletCheck();
  }, []);

  /**
   * Getters
   */
  return {
    setWalletBalances,
    getWalletBalances,
    getIsWrongNetwork,
    getWalletAddress,
    getWalletNetwork,
    connectWallet,
  };
}
