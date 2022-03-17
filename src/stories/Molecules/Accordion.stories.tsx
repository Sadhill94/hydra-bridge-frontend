import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Accordion from "../../common/components/Molecules/Accordion/Accordion";

import { stakenetTheme as theme } from "../../shell/theme/stakenetTheme";
import { FlexWrapper } from "../../common/components/Atoms/Wrappers/Wrapper";
import { InputLabel as Label } from "../../common/components/Atoms/Label/Label";
import RoundedBubble from "../../common/components/Atoms/RoundedBubble/RoundedBubble";
import ReceiveDetails from "../../common/components/Atoms/ReceiveDetails/ReceiveDetails";
import { IconKeys } from "../../common/commonTypes";
import {
  AccordionHeader,
  ReceiveDetailsAccordionHeader,
} from "../../common/components/Molecules/Accordion/AccordionHeaders";
import { AccordionContent } from "../../common/components/Molecules/Accordion/styles";

export default {
  title: "Molecules/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <div style={{ maxWidth: theme.maxWidth["5xl"] }}>
    <Accordion {...args}>Connect wallet</Accordion>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  header: (
    <AccordionHeader>
      <FlexWrapper
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Label margin={"0"} style={{ width: "100%" }}>
          Available routes
        </Label>
        <RoundedBubble>3</RoundedBubble>
      </FlexWrapper>
    </AccordionHeader>
  ),
  content: (
    <AccordionContent>
      <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>Hello</h1>
    </AccordionContent>
  ),
};

const receiveDetailsHeaderProps = {
  isOpen: true,
  amountOut: "0.00001",
  inProgress: false,
  isDisabled: false,
  gasFees: "~$8.53",
};

const receiveDetailsProps = {
  iconKey: "hopBridge" as IconKeys,
  chainName: "Hop",
  gasFees: "~$8.53",
  serviceTime: "~5",
  amountOut: "0.00001 ETH",
};
export const AsReceiveDetails = Template.bind({});
AsReceiveDetails.args = {
  bg: theme.colors.gray.darkest,
  isOpenFromParent: true,
  header: <ReceiveDetailsAccordionHeader {...receiveDetailsHeaderProps} />,
  content: (
    <AccordionContent padding={"0 1.6rem 1.6rem 1.6rem"}>
      <ReceiveDetails {...receiveDetailsProps} />
    </AccordionContent>
  ),
};
