import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Button } from "../Atoms/Buttons/Button";
import Icon from "../Atoms/Icons/Icon";

import { stakenetTheme as theme } from "../../../shell/theme/stakenetTheme";
import { DEFAULT_NOTIFY_CONFIG } from "../../constants";
import { formatWalletAddress } from "../../../helpers/walletHelper";
import { useWallet } from "../../../store/wallet/useWallet";

const ConnectWallet = () => {
  const { connectWallet, getWalletAddress, getIsWrongNetwork } = useWallet();
  const { t } = useTranslation();

  const handleCopyAddress = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    navigator.clipboard.writeText(getWalletAddress).then(
      () => {
        toast.info(t("common.copied"), {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: 1000,
          pauseOnHover: false,
        });
      },
      (err) => {
        toast.error(`${t("errors.copy")} ${getWalletAddress} `, {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: false,
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  if (!getWalletAddress) {
    return (
      <Button iconName={"cutArrowRight"} onClick={connectWallet}>
        {t("connect-wallet")}
      </Button>
    );
  }

  return (
    <Button onClick={handleCopyAddress}>
      {formatWalletAddress(getIsWrongNetwork, getWalletAddress)}
      {!getIsWrongNetwork && (
        <span className={"btn-icon"}>
          <Icon
            color={theme.colors.white}
            width={"2.1rem"}
            height={"2.1rem"}
            name={"copy"}
          />
        </span>
      )}
    </Button>
  );
};

export default ConnectWallet;
