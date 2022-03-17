import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BridgeButton from "../../common/components/BridgeButton/BridgeButton";
import TransferChainSelects from "../../common/components/TransferChain/TransferChainSelects";
import { ContainerCard } from "../../common/components/Atoms/Containers/Container";
import { Input } from "../../common/components/Atoms/Input/Input";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";
import { ReceiveDetailsAccordionHeader } from "../../common/components/Molecules/Accordion/AccordionHeaders";
import Accordion from "../../common/components/Molecules/Accordion/Accordion";
import { AccordionContent } from "../../common/components/Molecules/Accordion/styles";

import { ETH, GOERLI, POLYGON } from "../../common/constants";
import { ChainResponseDto, RouteDto } from "../../common/dtos";
import { getOnlyNumbersAndAllowDotPattern } from "../../helpers/regexHelper";
import { replaceCharsToHaveOnlyDotOrStringInIt } from "../../helpers/stringHelper";
import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { getBridgeIcon } from "../../helpers/icons";
import ReceiveDetails from "../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import { formatGasFees, formatServiceTime } from "../../helpers/formatsHelper";

type Props = {
  chains: ChainResponseDto[];
  chainFrom: ChainResponseDto;
  chainTo: ChainResponseDto;
  amountIn: string;
  parsedAmountIn: number;
  amountOut: string;
  selectedRoute?: RouteDto;
  isConnected: boolean;
  isApproved: boolean;
  inProgress: boolean;
  isWrongNetwork: boolean;
  isAbleToMove: boolean;
  isNotEnoughBalance: boolean;
  isApproveReady: boolean;
  isEth: boolean;
  isDisabled: boolean;
  onSetAmountOut: (value: string) => void;
  onSelectChainFrom: (option: any) => void;
  onSelectChainTo: (option: any) => void;
  onAmountChange: (evt: any) => void;
  onConnectWallet: () => void;
  onApproveWallet: () => void;
  onMoveAssets: () => void;
  onResetValues: () => void;
};

const MainContent = ({
  chains,
  chainFrom,
  chainTo,
  amountIn,
  parsedAmountIn,
  amountOut,
  selectedRoute,
  isEth,
  isAbleToMove,
  isNotEnoughBalance,
  isApproveReady,
  isApproved,
  isConnected,
  inProgress,
  isDisabled,
  isWrongNetwork,
  onSetAmountOut,
  onSelectChainFrom,
  onSelectChainTo,
  onAmountChange,
  onConnectWallet,
  onApproveWallet,
  onMoveAssets,
  onResetValues,
}: Props) => {
  const { t } = useTranslation();

  const [isReceiveDetailsOpen, setIsReceiveDetailsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    console.log("SELECTED ROUTE", selectedRoute);
    setIsReceiveDetailsOpen(!!selectedRoute);
    if (selectedRoute) {
      onSetAmountOut(selectedRoute.bridgeRoute?.amountOut);
    }
  }, [selectedRoute]);

  // reset the process (hide routes and close accordion) if the user type only 0 or empty in the input
  useEffect(() => {
    if (parsedAmountIn <= 0) {
      onResetValues();
    }
  }, [parsedAmountIn]);

  const amountInAdditionalAttributes = {
    pattern: getOnlyNumbersAndAllowDotPattern,
    autocomplete: "off",
    autocorrect: "off",
    minLength: "1",
    maxLength: "79",
    spellCheck: false,
    inputMode: "decimal",
  };

  const handleAmountInChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = replaceCharsToHaveOnlyDotOrStringInIt(evt.target.value);
    onAmountChange(value);
  };

  /**
   * Handler to map the results of the ChainResponseDto of the available sender to a SelectionOptionType
   * @param chains - the senders available
   */
  const mapChainResponseDtoFromSendingTarget = (chains: ChainResponseDto[]) => {
    return chains
      .filter((item) => item.isSendingEnabled)
      .map((chain: ChainResponseDto) => {
        const name = chain.name.toString().toLowerCase().includes(GOERLI)
          ? ETH
          : (chain.name.toString().toLowerCase() as any);
        return {
          label: chain.name,
          value: chain.chainId,
          iconName: `${name}Coin`,
        };
      });
  };

  /**
   * Handler to map the results of the ChainResponseDto of the available receiver to a SelectionOptionType
   * @param chains - the receivers available
   */
  const mapChainResponseDtoToReceivingTarget = (chains: ChainResponseDto[]) => {
    return chains
      .filter((item) => item.isReceivingEnabled)
      .map((chain: ChainResponseDto) => {
        const name = chain.name.toString().toLowerCase().includes(POLYGON)
          ? POLYGON
          : (chain.name.toString().toLowerCase() as any);

        return {
          label: chain.name,
          value: chain.chainId,
          iconName: `${name}Coin`,
        };
      });
  };

  const renderReceiveDetailsContent = (): ReactNode => {
    if (selectedRoute) {
      try {
        const {
          bridgeRoute: {
            amountOut,
            bridgeName,
            fromAsset: { symbol },
            bridgeInfo: { displayName, serviceTime },
          },
          transactionCoastUsd,
        } = selectedRoute;

        const props = {
          iconKey: getBridgeIcon(bridgeName),
          chainName: displayName,
          gasFees: `~$${formatGasFees(transactionCoastUsd)}`,
          serviceTime: `~${formatServiceTime(serviceTime)}`,
          amountOut: `${amountOut} ${symbol.toLocaleUpperCase()}`,
        };
        return (
          <AccordionContent padding={"0 1.6rem 1.6rem 1.6rem"}>
            <ReceiveDetails {...props} />
          </AccordionContent>
        );
      } catch (err) {
        console.log(err);
      }
    }
    return <></>;
  };

  return (
    <ContainerCard hasHoverEffect={true}>
      <TransferChainSelects
        optionsChainsFrom={mapChainResponseDtoFromSendingTarget(chains)}
        optionsChainsTo={mapChainResponseDtoToReceivingTarget(chains)}
        chainFrom={chainFrom?.chainId!}
        chainTo={chainTo?.chainId!}
        onSelectChainFrom={onSelectChainFrom}
        onSelectChainTo={onSelectChainTo}
        isDisabled={inProgress || isWrongNetwork}
      />
      <Input
        label={t("common.send")}
        value={!amountIn ? "" : amountIn}
        additionalAttributes={amountInAdditionalAttributes}
        placeholder={"0.0"}
        isDisabled={inProgress || isWrongNetwork}
        onChange={handleAmountInChange}
        style={{ marginBottom: theme.margin.default }}
      />
      <Label style={{ marginRight: "auto" }}>{t("common.receive")}</Label>
      <Accordion
        header={
          <ReceiveDetailsAccordionHeader
            isOpen={isReceiveDetailsOpen}
            amountOut={amountOut}
            inProgress={inProgress}
            gasFees={`~$${formatGasFees(selectedRoute?.transactionCoastUsd)}`}
          />
        }
        content={renderReceiveDetailsContent()}
        isOpenFromParent={isReceiveDetailsOpen}
        onToggle={() => setIsReceiveDetailsOpen(!isReceiveDetailsOpen)}
      />
      <BridgeButton
        isConnected={isConnected}
        isApproved={isApproved}
        inProgress={inProgress}
        isRouteIdSelected={!!selectedRoute?.id}
        isEth={isEth}
        isAmountSet={!!amountIn}
        isAbleToMove={isAbleToMove}
        isNotEnoughBalance={isNotEnoughBalance}
        isApproveReady={isApproveReady}
        isDisabled={isDisabled}
        onWalletConnect={onConnectWallet}
        onWalletApprove={onApproveWallet}
        onMoveAssets={onMoveAssets}
        style={{
          marginBottom: theme.margin.sm,
          marginTop: theme.margin.default,
        }}
      />
    </ContainerCard>
  );
};

export default MainContent;
