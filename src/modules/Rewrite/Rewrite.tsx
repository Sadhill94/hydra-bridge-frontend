import React from "react";

import {
  StyledHomeCustomFlexWrapper,
  StyledHomeResponsiveFlexWrapper,
  StyledHydraBackground,
} from "./styles";

import Icon from "../../common/components/Atoms/Icons/Icon";
import ConnectWallet from "../../common/components/ConnectWallet/ConnectWallet";
import {
  Container,
  ContainerCard,
} from "../../common/components/Atoms/Containers/Container";

import { ContainerType } from "../../common/enums";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import AssetSelect from "../../common/components/AssetSelect";
import { IInlineStyles } from "../../common/commonTypes";

const styles: IInlineStyles = {
  containerCard: { marginBottom: theme.margin.xxl },
  bridgeRoutesWrapper: { marginTop: theme.margin.xl },
};
const Rewrite = () => {
  return (
    <StyledHydraBackground>
      <StyledHomeCustomFlexWrapper>
        <Icon
          className={"hydra-bridge-logo-sm"}
          width={"13.6rem"}
          height={"3.8rem"}
          name={"hydraBridgeLogo"}
        />
        <ConnectWallet />
      </StyledHomeCustomFlexWrapper>
      <Container type={ContainerType.XXXL}>
        <Container maxWidth={theme.maxWidth["5xl"]} noGutter={true}>
          <ContainerCard style={styles.containerCard} hasHoverEffect={true}>
            <StyledHomeResponsiveFlexWrapper>
              <Icon
                className={"hydra-bridge-logo"}
                width={"18rem"}
                height={"4.1rem"}
                name={"hydraBridgeLogo"}
              />
              <AssetSelect className={"asset-select"} />
            </StyledHomeResponsiveFlexWrapper>
          </ContainerCard>
          {/*    <MainContent*/}
          {/*      chains={chains}*/}
          {/*      chainFrom={chainFrom!}*/}
          {/*      chainTo={chainTo!}*/}
          {/*      amountIn={amountIn}*/}
          {/*      amountOut={amountOut}*/}
          {/*      route={getSelectedRoute()}*/}
          {/*      inProgress={inProgress}*/}
          {/*      isAbleToMove={isAbleToMove}*/}
          {/*      isApproveReady={!!buildApproveTx}*/}
          {/*      isApproved={isApproved}*/}
          {/*      isConnected={isConnected}*/}
          {/*      isEth={isEth}*/}
          {/*      isNotEnoughBalance={isNotEnoughBalance}*/}
          {/*      isWrongNetwork={isWrongNetwork}*/}
          {/*      isDisabled={isActionDisabled}*/}
          {/*      onAmountChange={handleAmountInChange}*/}
          {/*      onApproveWallet={handleApproveWallet}*/}
          {/*      onConnectWallet={onConnectWallet}*/}
          {/*      onMoveAssets={handleMoveAssets}*/}
          {/*      onSelectChainTo={handleOnSelectChainTo}*/}
          {/*      onSelectChainFrom={handleOnSelectChainFrom}*/}
          {/*    />*/}

          {/*    {shouldShowBridgeRoutes && (*/}
          {/*      <div style={styles.bridgeRoutesWrapper}>*/}
          {/*        <BridgeRoutes*/}
          {/*          inProgress={inProgress}*/}
          {/*          selectedRouteId={routeId}*/}
          {/*          routes={bridgeRoutes}*/}
          {/*          onRouteSelect={handleOnRouteClick}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    )}*/}
        </Container>
      </Container>
    </StyledHydraBackground>
  );
};

Rewrite.whyDidYouRender = true;
export default Rewrite;
