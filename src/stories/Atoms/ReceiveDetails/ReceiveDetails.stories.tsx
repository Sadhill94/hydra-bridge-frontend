import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ReceiveDetails from "../../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import { IconKeys } from "../../../common/commonTypes";

export default {
  title: "Atoms/ReceiveDetails",
  component: ReceiveDetails,
} as ComponentMeta<typeof ReceiveDetails>;

const Template: ComponentStory<typeof ReceiveDetails> = (args) => (
  <ReceiveDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  iconKey: "hopBridge" as IconKeys,
  chainName: "Hop",
  gasFees: "~$8.53",
  serviceTime: "~5",
  amountOut: "0.00001 ETH",
};
