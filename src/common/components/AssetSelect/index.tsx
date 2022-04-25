import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import BrandSelect from "../Molecules/BrandSelect/BrandSelect";

import { SelectOptionType } from "../Molecules/BrandSelect/SelectOption";
import { TokenResponseDto } from "../../dtos";
import { IStyleableProps } from "../../commonTypes";

import { InputLabel } from "../Atoms/Label/Label";
import { useChains } from "../../../store/chains/useChains";
import { useBridge } from "../../../store/bridge/useBridge";
import { useCommon } from "../../../store/common/useCommon";
import { StyledAssetSelectResponsiveFlexWrapper } from "./styles";

const AssetSelect = ({ className }: IStyleableProps) => {
  const { getTokens } = useChains();
  const { isDisabled, isLoading } = useCommon();
  const { getSelectedToken } = useBridge();
  const { t } = useTranslation();

  const options: SelectOptionType[] = useMemo(
    () =>
      getTokens.map((token: TokenResponseDto) => ({
        label: token.symbol,
        value: token.id,
        iconName: `${token.symbol.toLocaleLowerCase()}Coin`,
      })),
    [getTokens]
  );

  const getValue = useCallback(
    () =>
      options.find((option) => option.value === getSelectedToken?.id) || null,
    [options, getSelectedToken]
  );

  const handleSelectAsset = (option: SelectOptionType) => {
    console.log(option);
    // const { value } = option;
    // setAsset(value);
    // setShowRoutes(false);
    // setIsDisabled(true);
    // if (amountIn && getParsedAmountIn() > 0) {
    //   const isNotEnoughBalance = getIsNotEnoughBalance(
    //     walletBalances!,
    //     getParsedAmountIn(),
    //     value,
    //     isWrongNetwork
    //   );
    //   if (!isNotEnoughBalance) {
    //     onDebouncedQuote({
    //       recipient: address!,
    //       fromAsset: value,
    //       fromChainId: chainFrom?.chainId!,
    //       toAsset: value,
    //       toChainId: chainTo?.chainId!,
    //       amount: getParsedAmountIn(),
    //     });
    //   }
    //   if (isNotEnoughBalance) {
    //     toast.error(t("not-enough-funds"), {
    //       ...DEFAULT_NOTIFY_CONFIG,
    //       autoClose: false,
    //     });
    //   }
    //   setIsNotEnoughBalance(isNotEnoughBalance);
    // }
  };

  return (
    <div className={className}>
      <StyledAssetSelectResponsiveFlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
      >
        <InputLabel className={"label"}>{t("common.send")}</InputLabel>
        <BrandSelect
          value={getValue()}
          options={options}
          placeholder={t("select-an-asset")}
          onChange={handleSelectAsset}
          isDisabled={isDisabled || isLoading}
        />
      </StyledAssetSelectResponsiveFlexWrapper>
    </div>
  );
};

export default React.memo(AssetSelect);
