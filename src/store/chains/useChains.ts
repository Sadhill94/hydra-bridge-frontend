import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { StoreContext } from "../StoreContext";
import { useBridge } from "../bridge/useBridge";

import {
  ChainResponseDto,
  RouteDto,
  TokenResponseDto,
} from "../../common/dtos";
import { getAllChains, getBridgeTokens } from "../../api/commonService";
import { handleFetchError } from "../../helpers/error";
import { SupportedChainId } from "../../common/enums";
import { ETH } from "../../common/constants";

/**
 * Hook - Allow us to expose directly values from the StoreContext regarding the ChainsReducers
 * We can expose state values, dispatch actions, create getter
 * Since our StoreContext got multiple reducers, we created an overcoat for each of our reducers
 * to simplify the interactions with them
 */
export function useChains() {
  // extract the state and dispatcher from the StoreContext that matter for our hook only
  const { chainsState, chainsDispatch } = useContext(StoreContext);
  const { getSelectedToken } = useBridge();

  const { t } = useTranslation();
  /**
   * Setters
   * apply the useCallback on dispatch to prevent unnecessary renders
   */
  const setChains = useCallback(
    (chains: ChainResponseDto[]) => chainsDispatch("setChains", chains),
    []
  );
  const setRoutes = useCallback(
    (routes: RouteDto[]) => chainsDispatch("setRoutes", routes),
    []
  );
  const setTokens = useCallback(
    (tokens: TokenResponseDto[]) => chainsDispatch("setTokens", tokens),
    []
  );

  /**
   * Fetchers
   */

  /**
   * Fetch all tokens available from a particular chain ID
   * @param chainId
   */
  async function fetchTokens(chainId: number): Promise<boolean> {
    try {
      const result = await getBridgeTokens(chainId);

      if (result && result.length > 0) {
        setTokens(result);
        return true;
      }
    } catch (err) {
      handleFetchError(t("errors.getting-bridge-tokens"), err);
    }
    return false;
  }

  /**
   * Fetch all chains supported for bridging
   */
  async function fetchChains(): Promise<boolean> {
    try {
      const result = await getAllChains();
      if (result && result.length > 0) {
        setChains(result);
        return true;
      }
    } catch (err) {
      handleFetchError(t("errors.getting-bridge-tokens"), err);
    }
    return false;
  }

  /***
   * Getters
   * apply the useMemo unnecessary renders
   */

  /**
   * Returns chains based of the current network of the built app
   */
  const getChains = useMemo(() => {
    if (
      parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID!) ===
      SupportedChainId.GOERLI
    ) {
      return chainsState.chains.filter(
        (chain: ChainResponseDto) => chain.isTestnet
      );
    } else {
      return chainsState.chains.filter(
        (chain: ChainResponseDto) => !chain.isTestnet
      );
    }
  }, [chainsState.chains]);

  const getTokens = useMemo(() => {
    return chainsState.tokens;
  }, [chainsState.tokens]);

  /**
   * Returns routes based of the quote result
   */
  const getRoutes = useMemo(() => chainsState.routes, [chainsState.routes]);

  /**
   * Check if the token is ETH
   */
  const isETH = useMemo(() => {
    const token = getTokens.find(
      (token: TokenResponseDto) => token.id === getSelectedToken.id
    );
    return token?.symbol.toString().toLowerCase() === ETH;
  }, [getSelectedToken, getTokens]);

  return {
    fetchTokens,
    fetchChains,
    setChains,
    setRoutes,
    setTokens,
    getChains,
    getTokens,
    getRoutes,
    isETH,
  };
}
