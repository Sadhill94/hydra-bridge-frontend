import { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useChains from "../common/hooks/useChains";
import Layout from "../common/components/Layout";
import Fallback from "./Fallback";
import { StyledUserNotifyToastContainer } from "../common/components/Molecules/BrandToast/styles";

import "../i18n/I18nConfig";
import { lazyWithPreload } from "../helpers/lazy";
import { routes } from "../routes";
import { legacyTheme } from "./theme/legacyTheme";
import { ToastContentTransactionHash } from "../common/components/Atoms/ToastContent/ToastContent";
import { DEFAULT_NOTIFY_CONFIG } from "../common/constants";
import styled from "styled-components";

const Home = lazyWithPreload(
  () => import(/* webpackChunkName: 'LandingModule' */ "../modules/Home/Home")
);

const Rewrite = lazyWithPreload(
  () =>
    import(/* webpackChunkName: 'LandingModule' */ "../modules/Rewrite/Rewrite")
);

const Page404 = lazyWithPreload(
  () =>
    import(/* webpackChunkName: 'LandingModule' */ "../modules/Page404/Page404")
);

/**
 * Trigger a global toast info for the transaction hash
 * @param txHash
 * @param txUrl
 */
export const displayTxHash = (txHash: string, txUrl: string): void => {
  toast.info(<ToastContentTransactionHash txHash={txHash} txUrl={txUrl} />, {
    ...DEFAULT_NOTIFY_CONFIG,
    autoClose: false,
  });
};

const StyledLink = styled(Link)`
  font-size: 2rem;
  display: inline-block;
  margin-right: 2rem;
  color: white;
`;
const Shell = () => {
  const { chains } = useChains();

  return (
    <>
      <Layout theme={legacyTheme}>
        <StyledLink to={"/"}>home</StyledLink>
        <StyledLink to={"/rewrite"}>rewrite</StyledLink>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path={routes.home} element={<Home chains={chains} />} />
            <Route path={routes.rewrite} element={<Rewrite />} />
            <Route path={routes.page404} element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <StyledUserNotifyToastContainer
            containerId={"user__notify"}
            toastClassName={"toast"}
          />
        </Suspense>
      </Layout>
    </>
  );
};

export default Shell;
