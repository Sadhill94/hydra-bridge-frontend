import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemes } from "@react-theming/storybook-addon";
import {I18nextProvider} from "react-i18next";

import { stakenetTheme } from "../src/shell/theme/stakenetTheme";
import { StakenetGlobalStyle } from "../src/shell/theme/stakenetGlobalStyle";

import "./storybook.css";
import "../src/assets/fonts/index.css";
import { storyBookViewports } from "./vieports.config";
import i18n from "../src/i18n/I18nConfig";

addDecorator(withThemes(ThemeProvider, [stakenetTheme]));
addDecorator((s) => (
  <>
    <I18nextProvider i18n={i18n}/>
    <StakenetGlobalStyle />
    {s()}
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  viewport: {
    viewports: storyBookViewports,
    defaultViewport: "xl",
  },
};
